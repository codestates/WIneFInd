package Apoint.WIneFInd.Article.Controller;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class ArticleController {

    private final ArticleService articleService;
    private final WineService wineService;

    @Autowired
    public ArticleController(ArticleService articleService, WineService wineService) {
        this.articleService = articleService;
        this.wineService = wineService;
    }

    // 게시글 작성
    @PostMapping("article")
    public ResponseEntity<?> CreateArticle(@RequestBody ArticleDTO articleDTO) {

        try {
            // articleDTO wines를 통해서 먼저 와인에 대한 정보가 생성이 되고
            // 나머지 정보와 wines 를 통해서 생성된 Id를 통해서 판매글 생성
            Long wineId = wineService.Save(articleDTO.getWines().get(0)).getId();
            Article createArticle = articleService.Save(articleDTO, wineId);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("articleInfo", createArticle);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("게시글을 ‘생성’ 할 수 없습니다. \n" + e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("'articleDTO' 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }
    }

    // 게시글 페이징으로 조회 하기
    @GetMapping("article")
    public ResponseEntity<?> FindArticlePage(@PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                             @RequestParam(required = false) Long id,
                                             @RequestParam(required = false, defaultValue = "") String text,
                                             @RequestParam(required = false) List<String> typesList,
                                             @RequestParam(required = false) List<String> countriesList,
                                             @RequestParam(required = false) List<String> sweetnessList,
                                             @RequestParam(required = false) List<String> acidityList,
                                             @RequestParam(required = false) List<String> bodyList,
                                             @RequestParam(required = false) List<String> tannicList,
                                             @RequestParam(required = false) List<String> priceList) {

        try {
            // text가 기본값이 "" 이고 id가 null이며 List들이 null이면 전체 전체 리스트를 리턴
            if (text.equals("") && id == null && typesList == null && countriesList == null && sweetnessList == null
                    && acidityList == null && bodyList == null && tannicList == null && priceList == null
            ) {
                Page<Article> articles = articleService.FindByAllPage(pageable);
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("articlesInfo", articles);
                }});
            }
            // Id가 null 이 아니면 해당 Id에 해당하는 Article 조회 및 리턴
            if (id != null) {
                Article articles = articleService.FindById(id);
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("articlesInfo", articles);
                }});
            }
            // text 의 값이 들어온다면 텍스트 정보와 일치하는 Article 조회 및 리턴
            if (!text.equals("")) {
                // text 값이 들어 올경우 text 값에 따라 필터링 된 title & content 게시물을 찾음
                Page<Article> articles = articleService.FindByTotalSearch(text, pageable);
                // 게시글 리턴
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("articlesInfo", articles);
                }});
            }

            // 그밖에 Client에서 카테고리 선택시 List 형태로 보내오는 데이터를 처리하기 위해서 빌터패턴으로 저장
            // articleFilterDTO 로 데이터를 내려보낼때 깔끔하게 내려보내고 싶어서 컨트롤러에서 빌터배턴으로 저장
            ArticleFilterDTO articleFilterDTO = ArticleFilterDTO.builder()
                    .typesList(typesList)
                    .countriesList(countriesList)
                    .sweetnessList(sweetnessList)
                    .acidityList(acidityList)
                    .bodyList(bodyList)
                    .tannicList(tannicList)
                    .priceList(priceList)
                    .build();

            // List들의 데이터들을 처리하기 위해 FindByArticleFiltering로 값 내려주기
            Page<Article> articles = articleService.FindByArticleFiltering(articleFilterDTO, pageable);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("articlesInfo", articles);
            }});

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("게시글을 ‘조회’ 할 수 없습니다. \n" + e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("해당 게시글을 '수정' 할 수 없습니다." +
                    "title content 를 필수로 입력해 주세요\n" + e);
        }
    }



    // 와인 추천 리스트 알고리즘
    @PostMapping("article/algo")
    public ResponseEntity<?> ArticleAlgolithm(@RequestBody ArticleAlgorithmDTO articleAlgorithmDTO) {


        List<Article> articleAlgo = articleService.FindByRecommendedWineAlgo(articleAlgorithmDTO);

        return ResponseEntity.ok().body(articleAlgo);
    }

    // 사용되는곳 확인
    @GetMapping("articles")
    public ResponseEntity<?> FindArticle(@RequestParam(required = false) Long id) {

        // Id가 null 이 아니면 해당 Id에 해당하는 Article 로 이동
        if (id != null) {
            Article article = articleService.FindById(id);
            return ResponseEntity.ok().body(article);
            // Id가 null 이면 전체 조회
        } else {
            List<Article> articles = articleService.FindByAll();
            return ResponseEntity.ok().body(articles);
        }
    }


    // 게시글 수정 하기
    @PutMapping("article/{id}")
    public ResponseEntity<?> UpdateArticle(@RequestBody ArticleDTO articleDTO,
                                           @PathVariable Long id) {
        try {
            // 입력받은 정보에서 id로 수정할 게시글을 찾은뒤에 수정
            Article updateArticle = articleService.Update(articleDTO, id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("articleInfo", updateArticle);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 게시글을 ‘수정’ 할 수 없습니다. \n" + e);
        }
    }

    // 게시글 삭제 하기
    @DeleteMapping("/article/{id}")
    public ResponseEntity<?> DeleteArticle(@PathVariable Long id) {

        try {
            // 입력받은 Id에 해당하는 게시글 삭제 하기
            String deleteArticle = articleService.Delete(id);
            return ResponseEntity.ok().body(deleteArticle);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당 게시글을 ‘삭제’ 할 수 없습니다. \n" + e);
        }
    }

}
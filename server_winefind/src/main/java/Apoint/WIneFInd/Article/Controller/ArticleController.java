package Apoint.WIneFInd.Article.Controller;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
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
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
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
            // 게시글 판매 글에서 와인 생성도 같이 할 수 있게 articleDTO 에 게시글 정보 담기
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
                                             @RequestParam(required = false, defaultValue = "") String text) {

        System.out.println("id : " + id);
        System.out.println("text : " + text);
        try {
            if (text.isEmpty() && id == null) {
                Page<Article> articles = articleService.FindByAllPage(pageable);
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("articlesInfo", articles);
                }});
            }
            // Id가 null 이 아니면 해당 Id에 해당하는 Article 페이지로 이동
            if (id != null) {
                Article article = articleService.FindById(id);
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("articlesInfo", article);
                }});
            }
            // text 값이 들어 올경우 text 값에 따라 필터링 된 title & content 게시물을 찾음
            Page<Article> articles = articleService.FindByTotalSearch(text, pageable);

            // 게시글 리턴
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


    // 게시글 전체 조회 페이지와 페이징 처리 페이지를 구분하기 위해서 API를 나누어서 사용
    // Page를 1번부터 설정으로 해도 안되서... 추후에 좀더 고민해보는걸로 일단은 나눠놓기
    @GetMapping("article/filter")
    public Page<Article> FindFilteringArticle(@PageableDefault(size = 5) Pageable pageable,
//                                              @RequestBody ArticleFilterDTO articleFilterDTO
                                              @RequestParam(required = false) List<String> typesList,
                                              @RequestParam(required = false) List<String> countriesList,
                                              @RequestParam(required = false) List<String> sweetnessList,
                                              @RequestParam(required = false) List<String> acidityList,
                                              @RequestParam(required = false) List<String> bodyList,
                                              @RequestParam(required = false) List<String> tannicList,
                                              @RequestParam(required = false) List<String> priceList
    ) {

//
        ArticleFilterDTO articleFilterDTO = ArticleFilterDTO.builder()
                .typesList(typesList)
                .countriesList(countriesList)
                .sweetnessList(sweetnessList)
                .acidityList(acidityList)
                .bodyList(bodyList)
                .tannicList(tannicList)
                .priceList(priceList)
                .build();

//        System.out.println("articleFilterDTO 들어왔니? " + articleFilterDTO.toString());
//        System.out.println("articleFilterDTO type 들어왔니? " + articleFilterDTO.getTypesList().toString());
//        System.out.println("articleFilterDTO type 들어왔니? " + articleFilterDTO.getTypesList().get(0).toString());

        Page<Article> articles = articleService.FindByArticleFiltering(articleFilterDTO, pageable);

        return articles;
    }

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
            // 입력받은 정보에서 title로 수정할 게시글을 찾은뒤에 수정
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
            String deleteArticle = articleService.Delete(id);
            return ResponseEntity.ok().body(deleteArticle);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당 게시글을 ‘삭제’ 할 수 없습니다. \n" + e);
        }
    }

}
package Apoint.WIneFInd.Article.Controller;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class ArticleController {

    private final ArticleService articleService;
    private final WineService wineService;

    @Autowired
    public ArticleController(ArticleService articleService, WineService wineService) {
        this.articleService = articleService;
        this.wineService = wineService;
    }




    @PostMapping("article")
    public ResponseEntity<?> CreateArticle(@RequestBody ArticleDTO articleDTO) {

        try {
            Wine save = wineService.Save(articleDTO.getWines().get(0));
            Article saveTitle = articleService.Save(articleDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Wine", save);
                put("data", saveTitle);
            }});

        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("에러 발생!!! " + e);
        }
    }



    @GetMapping("article")
    public ResponseEntity<?> FindArticle(@RequestParam(required = false) Long id) {
       if (id != null) {
            Optional<Article> article = articleService.FindById(id);
            return ResponseEntity.ok().body(article);
        } else {
            List<Article> articles = articleService.FindByAll();
            return ResponseEntity.ok().body(articles);
        }
    }

    @PutMapping("article")
    public ResponseEntity<?> UpdateArticle(@RequestBody Article article) {
        articleService.Update(article);
        return ResponseEntity.ok().body("update success");
    }

    @DeleteMapping("/article/{id}")
    public ResponseEntity<?> DeleteArticle(@PathVariable Long id) {
        articleService.Delete(id);
        return ResponseEntity.ok().body("delete success");
    }


}
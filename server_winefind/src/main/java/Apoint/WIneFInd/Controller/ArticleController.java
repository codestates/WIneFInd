package Apoint.WIneFInd.Controller;

import Apoint.WIneFInd.Domain.ArticleDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping(value = "/article")
    public ResponseEntity<?> CreateArticle(@RequestBody ArticleDTO articleDTO) {
        articleService.CreateArticle(articleDTO);

        return ResponseEntity.ok().body(new HashMap<>(){{
            put("message", "create success!");
        }});
    }

    //조회
    @GetMapping(value = "/article")
    public ResponseEntity<?> FindByIdArticle(@RequestParam(required = false) Long id) {
        if (id != null) {
            Article article = articleService.FindById(id);
            return ResponseEntity.ok().body(article);
        } else {
            List<Article> articles = articleService.FindByAll();
            return ResponseEntity.ok().body(articles);
        }
    }

    @PutMapping(value = "/article")
    public ResponseEntity<?> UpdateArticle(@RequestBody Article article) {
        articleService.UpdateArticle(article);
        return ResponseEntity.ok().body("update success");
    }

    @DeleteMapping(value = "/article/{id}")
    public ResponseEntity<?> DeleteArticle(@PathVariable Long id) {
        articleService.DeleteArticle(id);
        return ResponseEntity.ok().body("delete success");
    }
}

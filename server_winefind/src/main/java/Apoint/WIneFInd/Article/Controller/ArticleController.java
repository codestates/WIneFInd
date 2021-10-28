package Apoint.WIneFInd.Article.Controller;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("article")
    public ResponseEntity<?> CreateArticle(@RequestBody ArticleDTO articleDTO) {

        try {
            Article saveTitle = articleService.Save(articleDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("data", saveTitle);
            }});

        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("동일한 아이디가 존재 합니다." + e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("에러 발생!!! " + e);
        }
    }


}
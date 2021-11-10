package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleService {

    public Article Save(ArticleDTO articleDTO, Long id);

    public List<Article> FindByAll();

    public Page<Article> FindByAllPage(Pageable pageable);

    public Page<Article> FindByTitleContainingOrContentContaining(String text,String content, Pageable pageable);

    public Article FindById(Long id);

    public Article Update(ArticleDTO articleDTO, Long id);

    public String Delete(Long id);

    Page<Article> FindByTotalSearch(String text, Pageable pageable);

    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable);

}
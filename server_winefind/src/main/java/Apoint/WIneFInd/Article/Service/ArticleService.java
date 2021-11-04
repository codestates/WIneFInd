package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ArticleService {

    public Article Save(ArticleDTO articleDTO);

    public List<Article> FindByAll();

    public Page<Article> FindByAllPage(Pageable pageable);

    public Page<Article> FindByTitleContainingOrContentContaining(String text,String content, Pageable pageable);

    public Article FindById(Long id);

    public Article Update(ArticleDTO articleDTO, Long id);

    public String Delete(Long id);

}
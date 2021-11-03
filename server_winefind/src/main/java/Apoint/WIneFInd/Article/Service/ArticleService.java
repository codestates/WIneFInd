package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ArticleService {
//ahah

    public Article Save(ArticleDTO articleDTO);

    public List<Article> FindByAll();

    public Page<Article> FindByAllPage(Pageable pageable);

    public Page<Article> FindByTitleContainingOrCommentContaining(String text,String content, Pageable pageable);

    public Optional<Article> FindById(Long id);

    public Article Update(Article article);

    public List<Article> Delete(Long id);

}
package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleService {

    public Article Save(ArticleDTO articleDTO);

    public List<Article> FindByAll();

    public Optional<Article> FindById(Long id);

    public Article Update(Article article);

    public List<Article> Delete(Long id);

}
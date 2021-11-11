package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleRepositoryCustom {

    Page<Article> FindByTotalSearch(String text, Pageable pageable);

    Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable);

    List<Article> RecommendedArticle(ArticleAlgorithmDTO articleAlgorithmDTO);
}

package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
//asdf

    List<Article> findByTitle(String title);
}
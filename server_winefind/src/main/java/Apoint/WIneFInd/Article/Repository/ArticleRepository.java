package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Model.Wine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long>, QuerydslPredicateExecutor<Article>, ArticleRepositoryCustom {

    Optional<Article> findByTitle(String title);

    Page<Article> findByTitleContainingOrContentContaining(String text, String content, Pageable pageable);
}
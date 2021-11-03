package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
//asdf//asdfaa

    List<Article> findByTitle(String title);

    Page<Article> findByTitleContainingOrCommentContaining(String text, String content, Pageable pageable);
}
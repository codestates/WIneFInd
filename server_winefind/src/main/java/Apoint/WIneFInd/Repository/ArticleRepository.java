package Apoint.WIneFInd.Repository;


import Apoint.WIneFInd.Domain.ArticleDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Model.Users;
import Apoint.WIneFInd.Model.Wines;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class ArticleRepository {

    private final EntityManager entityManager;

    public ArticleRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void Create(ArticleDTO articleDTO) {

        Article article = new Article();
        Users user = new Users();
        Wines wine = new Wines();

        user.setId(articleDTO.getUserId());
        wine.setId(articleDTO.getUserId());

        article.setTitle(articleDTO.getTitle());
        article.setImage(articleDTO.getImage());
        article.setComment(articleDTO.getComment());
        article.setUser(user);
        article.setWine(wine);

        entityManager.persist(article);
        entityManager.flush();
        entityManager.close();

    }

//    Article 전체 목록 조회
    public List<Article> findAll() {

        return entityManager.createQuery("SELECT a FROM Article a", Article.class).getResultList();
    }

    //    유저 아이디 선택해서 찾기
    public Article findById(long id) {
        List<Article> list = entityManager
                .createQuery("SELECT a FROM Article a WHERE a.id='" + id + "'", Article.class)
                .getResultList();
        entityManager.close();
        return list.get(0);
    }

    public List<Article> findByUserId(long userid) {
        List<Article> list = entityManager
                .createQuery("SELECT a FROM Article a WHERE a.user='" + userid + "'", Article.class)
                .getResultList();
        entityManager.close();
        return list;
    }


//    public List<Article> findByEmail(String email) {
//        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
//        return entityManager.createQuery("SELECT u FROM Article u WHERE u.email = '" + email + "'", Article.class).getResultList();
//    }

    //    유저 아이디를 이용하여 업데이트
    public void Update(Article article) {

        Article updateArticle = findById(article.getId());
        Date now = new Date();

        updateArticle.setTitle(article.getImage());
        updateArticle.setImage(article.getImage());
        updateArticle.setComment(article.getComment());

        entityManager.persist(updateArticle);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 아이디를 이용하여 삭제
    public void Delete(long id) {
        Article deleteArticle = findById(id);
        entityManager.remove(deleteArticle);
        entityManager.close();
    }

}

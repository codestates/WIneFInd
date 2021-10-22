package Apoint.WIneFInd.Repository;

import Apoint.WIneFInd.Domain.ArticleDTO;
import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Model.Users;
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

        article.setTitle(signupDTO.getEmail());
        article (signupDTO.getPassword());
        article.setNickname(signupDTO.getNickname());
        article.setImage("resources/default.jpeg");

        entityManager.persist(user);
        entityManager.flush();
        entityManager.close();

    }

    public List<Article> findAll() {
        // DB service_user 테이블에 모든 유저 정보를 리턴합니다.
        // TODO :
        return entityManager.createQuery("SELECT u FROM Article u", Article.class).getResultList();
    }

    //    유저 아이디 선택해서 찾기
    public Article findById(long id) {
        List<Article> list = entityManager
                .createQuery("SELECT user FROM Article as user WHERE user.id='" + id + "'", Article.class)
                .getResultList();
        entityManager.close();
        return list.get(0);
    }


//    public List<Article> findByEmail(String email) {
//        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
//        return entityManager.createQuery("SELECT u FROM Article u WHERE u.email = '" + email + "'", Article.class).getResultList();
//    }

    //    유저 아이디를 이용하여 업데이트
    public void Update(Article users) {

        Article updateArticle = findById(users.getId());
        Date now = new Date();

        updateArticle.setComment(users.getComment());
        updateArticle.setTitle(users.getImage());
        updateArticle.setImage(users.getImage());
        updateArticle.setCreatedAt(now);
        updateArticle.setCreatedAt(now);

        entityManager.persist(updateArticle);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 아이디를 이용하여 삭제
    public void Delete(long id) {
        Article users = findById(id);
        entityManager.remove(users);
        entityManager.close();
    }

}

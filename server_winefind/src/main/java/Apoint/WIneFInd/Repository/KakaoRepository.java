package Apoint.WIneFInd.Repository;

import Apoint.WIneFInd.Controller.KakaoAPI;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Model.Consumer;
import Apoint.WIneFInd.Model.Users;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.ModelAndView;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Repository
@Transactional
public class KakaoRepository {

    EntityManager entityManager;

    public KakaoRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }




    public String Create (String code, HttpSession session){


        ModelAndView mav = new ModelAndView();

        KakaoAPI kakaoApi = new KakaoAPI();
        // 1번 인증코드 요청 전달
        String accessToken = kakaoApi.getAccessToken(code);
        if(accessToken == null){
            return "NO access Token";
        }
        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
        if(userInfo == null){
            return "NO userInfo";
        }

        System.out.println("login info : " + userInfo.toString());

        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("accessToken", accessToken);
        }

        mav.addObject("userId", userInfo.get("email"));
        mav.setViewName("index");
        System.out.println(mav);

        String email = userInfo.get("email").toString();
        String nickname = userInfo.get("nickname").toString();

        for (Consumer i : findAll()) {
            if (i.getEmail().equals(email)) {
                return null;
            }

        }
        Date now = new Date();
        Consumer consumer = new Consumer();
        consumer.setEmail(email);
        consumer.setNickname(nickname);
        consumer.setCreatedAt(now);
        consumer.setUpdatedAt(now);
        entityManager.persist(consumer);
        entityManager.flush();
        entityManager.close();
        return "Create Success";

    }

    public List<Consumer> findAll() {

        return entityManager.createQuery("SELECT c FROM Consumer c", Consumer.class).getResultList();
    }

    public List<Consumer> findByEmail(String email) {
        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
        return entityManager.createQuery("SELECT u FROM Consumer u WHERE u.email = '" + email + "'", Consumer.class).getResultList();

    }
}

package Apoint.WIneFInd.Controller;

import java.util.Date;
import java.util.HashMap;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@Transactional
public class KakaoController {

    KakaoAPI kakaoApi = new KakaoAPI();

    public KakaoController(EntityManager em) {
        this.em = em;
    }

    private final EntityManager em;

    Date now = new Date();

    @RequestMapping(value="/kakao")
    public ModelAndView login(@RequestParam("code") String code, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        // 1번 인증코드 요청 전달
        String accessToken = kakaoApi.getAccessToken(code);
        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);

        System.out.println("login info : " + userInfo.toString());

        if(userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("accessToken", accessToken);
        }

        Consumer consumer = new Consumer();
        consumer.setKakaocode(code);
        consumer.setCreatedAt(now);
        consumer.setUpdatedAt(now);
        consumer.setEmail(userInfo.get("email").toString());
        consumer.setNickname(userInfo.get("nickname").toString());
        em.persist(consumer);
        em.flush();
        em.close();

        mav.addObject("userId", userInfo.get("email"));
        mav.setViewName("index");
        return mav;
    }

    @RequestMapping(value="/kakao/logout")
    public ModelAndView logout(HttpSession session) {
        ModelAndView mav = new ModelAndView();

        kakaoApi.kakaoLogout((String)session.getAttribute("accessToken"));
        session.removeAttribute("accessToken");
        session.removeAttribute("userId");
        mav.setViewName("index");
        return mav;
    }



}

package Apoint.WIneFInd.Kakao.Controller;

<<<<<<< HEAD:server_winefind/src/main/java/Apoint/WIneFInd/Controller/KakaoController.java
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
=======
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> 015373d7bf53bbabb706cada0d45acef8bd91fee:server_winefind/src/main/java/Apoint/WIneFInd/Kakao/Controller/KakaoController.java

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class KakaoController {

    private final KakaoService kakaoService;




    public KakaoController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @GetMapping(value = "/kakao")
    public String login(@RequestParam("code") String code, HttpSession session) {

        if (kakaoService.CreateConsumer(code, session) == "Create Success") {
            return "Create Success";
        } else if (kakaoService.CreateConsumer(code, session) == "NO userInfo") {
            return "NO userInfo";
        } else if (kakaoService.CreateConsumer(code, session) == "NO access Token") {
            return "NO access Token";
        } else {
            return null;
        }

    }

//    @RequestMapping(value="/kakao/logout")
//    public ModelAndView logout(HttpSession session) {
//        ModelAndView mav = new ModelAndView();
//
//        kakaoApi.kakaoLogout((String)session.getAttribute("accessToken"));
//        session.removeAttribute("accessToken");
//        session.removeAttribute("userId");
//        mav.setViewName("index");
//        return mav;
//    }

}
package Apoint.WIneFInd.Controller;

import java.util.Date;
import java.util.HashMap;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import Apoint.WIneFInd.Model.Consumer;
import Apoint.WIneFInd.Service.KakaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class KakaoController {

    private final KakaoService kakaoService;

    public KakaoController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @GetMapping(value="/kakao")
    public String login(@RequestParam("code") String code, HttpSession session) {

        if(kakaoService.CreateConsumer(code, session)== "Create Success"){
            return "Create Success";
        } else if(kakaoService.CreateConsumer(code, session)=="NO userInfo"){
            return "NO userInfo";
        } else if(kakaoService.CreateConsumer(code, session)=="NO access Token") {
            return "NO access Token";
        } else{
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

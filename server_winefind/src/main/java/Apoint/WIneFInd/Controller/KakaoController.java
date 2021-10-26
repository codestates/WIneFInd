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
public class KakaoController {

    private final KakaoService kakaoService;

    public KakaoController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @GetMapping(value="/kakao")
    public ResponseEntity<?> login(@RequestParam("code") String code, HttpSession session) {

        kakaoService.CreateConsumer(code, session);

        return ResponseEntity.ok().body("KaKao login Seccess");
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

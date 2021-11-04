package Apoint.WIneFInd.Kakao.Controller;


import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class KakaoController {

    private final KakaoService kakaoService;
    private final MemberService memberService;

    @Autowired
    public KakaoController(KakaoService kakaoService, MemberService memberService) {
        this.kakaoService = kakaoService;
        this.memberService = memberService;
    }

    @GetMapping("kakao")
    public ResponseEntity<?> KakoLogIn(@RequestParam("code") String code, HttpServletResponse response) {

        try {
            User kakaoUser = kakaoService.Create(code);
            Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(kakaoUser));
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("kakaoInfo", kakaoUser);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("데이터를 찾을 수 없습니다.\n" + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("중복 회원 입니다.\n" + e);
        }
    }

}
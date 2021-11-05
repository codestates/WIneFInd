package Apoint.WIneFInd.Kakao.Controller;


import Apoint.WIneFInd.Kakao.Service.KakaoService;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.NoSuchElementException;

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

    // Client에서 카카오 인증들 통해서 받은 코드를 이 주소로 코드와 함깨 요청을 보내면 실행
    @GetMapping("kakao")
    public ResponseEntity<?> KakoLogIn(@RequestParam("code") String code, HttpServletResponse response) {

        try {
            // 받아온 code를 작성한 양식에 맞춰서 카카오 유저 생성
            User kakaoUser = kakaoService.Create(code);
            // 카카오 유저가 생성되면 해당 데이터로 JWT 토큰 생성
            Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(kakaoUser));
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("kakaoInfo", kakaoUser);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("데이터를 찾을 수 없습니다.\n" + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("해당 카카오 데이터 ‘조회’ 할 수 없습니다. \n" + e);

        }
    }

}
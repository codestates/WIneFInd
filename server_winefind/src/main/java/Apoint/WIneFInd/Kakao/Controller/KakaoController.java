package Apoint.WIneFInd.Kakao.Controller;


import Apoint.WIneFInd.Kakao.Domain.KaKaoPayDTO;
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
//@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
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
    public ResponseEntity<?> KaKaoLogIn(@RequestParam("code") String code, HttpServletResponse response) {
        System.out.println("kakao==============================="+code);
        try {
            // 받아온 code를 작성한 양식에 맞춰서 카카오 유저 생성
            User kakaoUser = kakaoService.Create(code);
            System.out.println("kakaoService.Create(code); 실행 됬니?");
            // 카카오 유저가 생성되면 해당 데이터로 JWT 토큰 생성
            String kakaoToken = memberService.CreateJWTToken(kakaoUser);


            return ResponseEntity.ok().body(new HashMap<>() {{
                put("token",kakaoToken);
                put("kakaoInfo", kakaoUser);

            }});
        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("데이터를 찾을 수 없습니다.\n" + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("해당 카카오 데이터 ‘조회’ 할 수 없습니다. \n" + e);

        }
    }

    @GetMapping("kakao/logout")
    public ResponseEntity<?> KaKaoLogOut(@RequestParam String code) {

        try {

            Object kakaoLogout = kakaoService.getAccessToken(code);
            return ResponseEntity.ok().body(kakaoLogout);
        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("데이터를 찾을 수 없습니다.\n" + e);
        }

    }

    @PostMapping("kakaopay")
    public String KakaoPay(@RequestBody KaKaoPayDTO kaKaoPayDTO) {

        String kaKaoPay = kakaoService.KaKaoPay(kaKaoPayDTO);

        return kaKaoPay;
    }

    @GetMapping("kakao/success")
    public ResponseEntity KaKaoSuccess(@RequestParam String pg_token) {

        String kakaoaAprove = kakaoService.KakaoaAprove(pg_token);

        return ResponseEntity.ok().body(kakaoaAprove);
    }

    @GetMapping("kakao/cancel")
    public String KaKaoCancel() {

        return "카카오 결제 취소";
    }

    @GetMapping("kakao/fail")
    public String KaKaoFail() {

        return "카카오 결제 실패";
    }

}
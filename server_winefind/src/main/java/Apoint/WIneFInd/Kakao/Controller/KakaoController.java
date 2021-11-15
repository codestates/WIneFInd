package Apoint.WIneFInd.Kakao.Controller;


import Apoint.WIneFInd.Kakao.Domain.KaKaoPayDTO;
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.NoSuchElementException;

@RestController
public class KakaoController {

    private final KakaoService kakaoService;
    private final MemberService memberService;

    @Autowired
    public KakaoController(KakaoService kakaoService, MemberService memberService) {
        this.kakaoService = kakaoService;
        this.memberService = memberService;
    }

    // Client 에서 카카오 인증들 통해서 받은 인가코드 받기
    @GetMapping("kakao")
    public ResponseEntity<?> KaKaoLogIn(@RequestParam("code") String code, HttpServletResponse response) {

        System.out.println("KaKaoLogIn() 진입 KaKao -> Controller -> p31 ");
        System.out.println("카카오 인가 코드 : " + code);

        try {
            // 받아온 code를 작성한 양식에 맞춰서 카카오 유저 생성
            User kakaoUser = kakaoService.Create(code);
            System.out.println("kakaoService.Create(code) KaKao -> Controller -> p38 ");
            // 카카오 유저가 생성되면 해당 데이터로 JWT 토큰 생성
            String kakaoToken = memberService.CreateJWTToken(kakaoUser);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("token", kakaoToken);
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

    // 카카오페이 결제
    @PostMapping("kakaopay")
    public String KakaoPay(@RequestBody KaKaoPayDTO kaKaoPayDTO) {

        // kaKaoPayDTO 에 맞춰서 카카오페이 결제 진행
        String kaKaoPay = kakaoService.KaKaoPay(kaKaoPayDTO);

        return kaKaoPay;
    }

    // 카카오 페이 결제가 성공적으로 진행됬을 경우
    @GetMapping("kakao/success")
    public ResponseEntity KaKaoSuccess(@RequestParam String pg_token) {

        String kakaoaAprove = kakaoService.KakaoAprove(pg_token);

        return ResponseEntity.ok().body(kakaoaAprove);
    }

    // 카카오 페이 결제가 취소 됬을 경우
    @GetMapping("kakao/cancel")
    public String KaKaoCancel() {

        return "카카오 결제 취소";
    }


    // 카카오 페이 결제가 실패 했을 경우
    @GetMapping("kakao/fail")
    public String KaKaoFail() {

        return "카카오 결제 실패";
    }

}
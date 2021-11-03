package Apoint.WIneFInd.Kakao.Controller;


import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class KakaoController {
    //adsf
    private final KakaoService kakaoService;

    public KakaoController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @GetMapping("kakao")
    public ResponseEntity<?> KakoLogIn(@RequestParam("code") String code, HttpServletResponse response) {

        try {
            Consumer createConsumer = kakaoService.Create(code, response);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("카카오 로그인 성공", createConsumer);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("" + e);
        }
    }

    @DeleteMapping("/kakao/{id}")
    public ResponseEntity<?> DeleteKakao(@PathVariable Long id) {
        kakaoService.Delete(id);
        return ResponseEntity.ok().body("Delete Success");
    }
}
package Apoint.WIneFInd.Member.Controller;

import Apoint.WIneFInd.Kakao.Service.KakaoService;
import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
//@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final KakaoService kakaoService;

    @Autowired
    public MemberController(MemberService memberService, KakaoService kakaoService) {
        this.memberService = memberService;
        this.kakaoService = kakaoService;
    }

    // 회원 가입
    @PostMapping("signup")
    public ResponseEntity<?> SignUp(@RequestBody SignUpDTO signUpDTO, HttpServletResponse response) {
        try {
            User signUpUser = memberService.Save(signUpDTO);
            // 쿠키생성 후 "winefind" 쿠키 생성
            String signupToken = memberService.CreateJWTToken(signUpUser);
            // "winefind" 쿠키 담기
            // 추가적으로 필요한 설정값 있을시 여기서 설정 ex) secure, samesite
            // response.addCookie(cookie);

            // 응답 메시지 설정
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("token", signupToken);
                put("userInfo", signUpUser);
                put("message", "회원가입이 성공 하였습니다.");
            }});

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 유저 를 ‘조회’ 할 수 없습니다. \n" + e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("회원가입 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("이미 가입되어 있는 회원 입니다. \n" + e);
        }

    }

    // 로그인
    @PostMapping("login")
    public ResponseEntity<?> LogIn(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {

        try {
            // 아이디와 비밀번호가 동일한지 체크 후에 쿠키 생성
            System.out.println("Controller LogIn() 진입 p60");
            User logInUser = memberService.LoginCheck(loginDTO);

            // LoginCheck로 로그인이 완료되면 JWTToken 만들기
            String token = memberService.CreateJWTToken(logInUser);
//            Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(logInUser));
//            ResponseCookie cookie = ResponseCookie.from("winefind", memberService.CreateJWTToken(logInUser)) .domain("http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com") .sameSite("None") .secure(true) .path("/") .build();
//            response.addHeader("Set-Cookie", cookie.toString());
//            cookie.setSecure(false);
//            response.addCookie(cookie);

            System.out.println("===================================");
            System.out.println("Controller LogIn() Token 아웃 p70");
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", logInUser);
                put("token", token);
//                put("message", "로그인이 성공 하였습니다" + cookie);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("null이 발생 했습니다. : " + e);
        }
    }


    // 유저 로그아웃
    @GetMapping("logout")
    public ResponseEntity<?> LogOut(HttpServletResponse response) {

        // "winefind" 라는 쿠키 값에 null을 준 뒤에 유효 시간을 0으로 하여 쿠키를 삭제
        Cookie cookie = new Cookie("winefind", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        System.out.println(cookie.getName());
        if (cookie.getName() == "winefind" && cookie.getValue() == null) {
            System.out.println(cookie.getName());
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Logged out successfully", cookie);
            }});
        } else {
            return ResponseEntity.badRequest().body("쿠기가 삭제되지 않았습니다.");
        }
    }

    // 유저 Auth 인증
    @GetMapping("auth")
    public ResponseEntity<?> CheckAuth(@RequestParam String token) {

        // "winefind" 라는 쿠키를 체크
        // Cookie[] cookies = request.getCookies();

        // 입력받은 토큰이 우리가 만든 토큰인지 체크
        Map<String, String> checkResult = memberService.CheckJWTToken(token);

        // 토큰이 우리것이 맞다면 email이 들어 있는지 체크!
        if (checkResult.get("email") != null) {
            // 들어있다면 DB 에서 email 을 찾은뒤 리턴
            User getUser = memberService.FindByEmail(checkResult.get("email"));
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", new HashMap<>() {{
                    put("id", getUser.getId());
                    put("email", getUser.getEmail());
                    put("username", getUser.getUsername());
                    put("image", getUser.getImage());
                }});
                // 유저의 role 타입으로 해당 유저가 카카오 로그인인지 일반회원 유저인지 판별
                if (getUser.getRole().equals("KAKAO")) {
                    put("message", "카카오 유저로 로그인 중입니다.");
                } else {
                    put("message", "일반 유저로 로그인 중입니다.");
                }
            }});
        } else {
            return ResponseEntity.badRequest().body(new HashMap<>() {{
                put("message", "해당 이메일이 존재 하지 않습니다.");
            }});
        }
    }

    // email로 유저 데이터 찾기
    @GetMapping("user")
    public ResponseEntity<?> TestUser(@RequestParam String email) {

        User user = memberService.FindByEmail(email);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> UpdateUser(@RequestBody SignUpDTO signUpDTO, @PathVariable Long id) {

        try {
            User updateUser = memberService.Update(signUpDTO, id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", updateUser);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("아이디를 찾을 수가 없습니다.  \n" + e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("해당 유저를 '수정' 할 수 없습니다 email, username, password 를" +
                    "필수로 넣어주세요 \n" + e);
        }
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<?> DeleteUser(@PathVariable Long id, HttpServletResponse response) {

        System.out.println("DeleteUser() 진입 " + id);
        try {
            // 입력 받은 아이디를 삭제
            String delete = memberService.Delete(id);

            Cookie cookie = new Cookie("winefind", null);
            cookie.setMaxAge(0);
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("message", delete);
            }});
        } catch (UnexpectedRollbackException e) {
            return ResponseEntity.status(500).body("아이디 정보를 찾을 수 없습니다. \n" + e);
        }
    }


}
package Apoint.WIneFInd.Member.Controller;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class MemberController {

    private final MemberService memberService;
    private final KakaoService kakaoService;

    @Autowired
    public MemberController(MemberService memberService, KakaoService kakaoService) {
        this.memberService = memberService;
        this.kakaoService = kakaoService;
    }

    @PostMapping("signup")
    public ResponseEntity<?> SignUp(@RequestBody SignUpDTO signUpDTO, HttpServletResponse response) {

        try {
            User signUpUser = memberService.Save(signUpDTO);
            // 쿠키생성 후 "winefind" 쿠키 생성
            Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(signUpUser));
            // "winefind" 쿠키 담기
            // 추가적으로 필요한 설정값 있을시 여기서 설정 ex) secure, samesite
            response.addCookie(cookie);


            // 응답 메시지 설정
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", signUpUser);
                put("message", "회원가입이 성공 하였습니다.");
            }});

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("이미 가입된 회원 정보가 존재 합니다 \n" + e);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("회원가입 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("이미 가입되어 있는 회원 입니다. \n" + e);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> LogIn(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {

//        try {
        // 아이디와 비밀번호가 동일한지 체크 후에 쿠키 생성
        User logInUser = memberService.LoginCheck(loginDTO);
//        List<User> logInUser = memberService.LoginCheck(loginDTO);
        Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(logInUser));
        response.addCookie(cookie);

        return ResponseEntity.ok().body(new HashMap<>() {{
            put("userInfo", logInUser);
            put("message", "로그인이 성공 하였습니다" + cookie);
        }});


//        } catch (NullPointerException e) {
//            return ResponseEntity.badRequest().body("Null이 발생 했습니다. : " + e);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("아이디 비밀번호 확인해봐! " + e);
//        }
    }

    @GetMapping("logout")
    public ResponseEntity<?> LogOut(HttpServletResponse response) {

        // "winefind" 라는 쿠키 값에 null을 준 뒤에 유효 시간을 0으로 하여 쿠키를 삭제
        Cookie cookie = new Cookie("winefind", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        Cookie kakao = new Cookie("Kakao", null);
        kakao.setMaxAge(0);
        response.addCookie(kakao);

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

    @GetMapping("auth")
    public ResponseEntity<?> CheckAuth(HttpServletRequest request) {

        // "winefind" 라는 쿠키를 체크
        Cookie[] cookies = request.getCookies();
        String cookieUser = "";
        try {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("winefind")) {
                    cookieUser = cookie.getValue();
                }
            }
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new HashMap<>() {{
                put("message", "인증을 할 수 없습니다.");
            }});
        }

//        토큰 유효성 체크
        Map<String, String> checkResult = memberService.CheckJWTToken(cookieUser);

        if (checkResult.get("email") != null) {
            User getUser = memberService.FindByEmail(checkResult.get("email"));
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", new HashMap<>() {{
                    put("id", getUser.getId());
                    put("email", getUser.getEmail());
                    put("username", getUser.getUsername());
                }});
                if (getUser.getRole().equals("KAKAO")) {
                    put("message", "카카오 유저로 로그인 중입니다.");
                } else {
                    put("message", "일반 유저로 로그인 중입니다.");
                }
            }});

        } else {
            return ResponseEntity.badRequest().body(new HashMap<>() {{
                put("data", null);
                put("message", "err");
            }});
        }
    }

    @GetMapping("user")
    public ResponseEntity<?> TestUser(@RequestParam String email) {

        User user = memberService.FindByEmail(email);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> UpdateUser(@RequestBody SignUpDTO signUpDTO,
                                        @PathVariable Long id) {

        try {
            User updateUser = memberService.Update(signUpDTO, id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userInfo", updateUser);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("아이디를 찾을 수가 없습니다.  \n" + e);
        }
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<?> DeleteUser(@PathVariable Long id, HttpServletResponse response) {

        System.out.println("id 들어오니?" + id);
        try {
            // 입력 받은 아이디를 삭제
            String delete = memberService.Delete(id);

            Cookie cookie = new Cookie("winefind", null);
            cookie.setMaxAge(0);
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("message", delete);
            }});
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("아이디 정보를 찾을 수 없습니다. \n" + e);
        }
    }


}
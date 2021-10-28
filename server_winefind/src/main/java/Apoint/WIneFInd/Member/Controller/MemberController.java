package Apoint.WIneFInd.Member.Controller;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
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
                put("message", "회원가입이 완료 되었습니다.");
                put("userInfo", signUpUser);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("이미 존재하는 회원입니다. : " + e);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> LogIn(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {

        try {
            // 아이디와 비밀번호가 동일한지 체크 후에 쿠키 생성
            User loginUser = memberService.LoginCheck(loginDTO).get(0);
            System.out.println(loginUser);
            Cookie cookie = new Cookie("winefind", memberService.CreateJWTToken(loginUser));
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Email", loginUser.getEmail());
            }});

        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body("Null이 발생 했습니다. : " + e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("아이디 비밀번호 확인해봐! " + e);
        }
    }

    @GetMapping("logout")
    public ResponseEntity<?> LogOut(HttpServletResponse response) {

        // "winefind" 라는 쿠키 값에 null을 준 뒤에 유효 시간을 0으로 하여 쿠키를 삭제
        Cookie cookie = new Cookie("winefind", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        if (cookie.getName() != "winefind") {
            return ResponseEntity.badRequest().body("쿠기가 삭제되지 않았습니다.");
        } else {
            return ResponseEntity.ok().body("Logged out successfully");
        }
    }

    @GetMapping("auth")
    public ResponseEntity<?> CheckAuth(HttpServletRequest request) {

        // "winefind" 라는 쿠키를 체크
        Cookie[] cookies = request.getCookies();
        String cookieUser = "";
        String kakaoUser = "";
        try {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("winefind")) {
                    cookieUser = cookie.getValue();
                }
                if (cookie.getName().equals("JSESSIONID")) {
                    kakaoUser = cookie.getValue();
                }
            }
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new HashMap<>() {{
                put("message", "인증을 할 수 없습니다.");
            }});
        }

//        토큰 유효성 체크
        Map<String, String> checkResult = memberService.CheckJWTToken(cookieUser);

        if (kakaoUser != "") {
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("message", "카카오 회원 로그인 되었습니다.");
            }});
        }

        if (checkResult.get("email") != null) {
            User getUser = memberService.FindByEmail(checkResult.get("email")).get(0);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("유저 정보", new HashMap<>() {{
                    put("id", getUser.getId());
                    put("email", getUser.getEmail());
                    put("nickname", getUser.getNickname());
                }});
                put("message", "로그인 중입니다.");
            }});

        } else {
            return ResponseEntity.badRequest().body(new HashMap<>() {{
                put("data", null);
                put("message", "err");
            }});
        }
    }

    @PutMapping("user")
    public ResponseEntity<?> UpdateUser(@RequestBody User user) {

        try {
            User updateUser = memberService.Update(user);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Update user", updateUser);
            }});
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("에러 ~ " + e);
        }
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<?> DeleteUser(@PathVariable Long id) {

        // 입력 받은 아이디를 삭제
        List<User> deleteUser = memberService.Delete(id);
        return ResponseEntity.ok().body(new HashMap<>() {{
            put("UserInfo List", deleteUser);
        }});
    }

    @GetMapping("user")
    public ResponseEntity<?> TestUser(@RequestParam String email) {

        List<User> member = memberService.FindByEmail(email);
        return ResponseEntity.ok().body(member);
    }
}
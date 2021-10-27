package Apoint.WIneFInd.Controller;


import Apoint.WIneFInd.Domain.LoginDTO;
import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Users;
import Apoint.WIneFInd.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    //    회원가입 API
    @PostMapping(value = "/signup")
    public ResponseEntity<?> UserSignUp(@RequestBody(required = true) SignupDTO signupDTO, HttpServletResponse response) {

        //        SignupDTO 에 맞는 형식으로 아이디 생성후 DB에 저장
        Users user = loginService.CreateUser(signupDTO);
        Cookie cookie = new Cookie("winefind", loginService.CreateJWTToken(user));
        response.addCookie(cookie);

        return ResponseEntity.ok().body(new HashMap<>() {{
            put("message", "회원가입이 완료 되었습니다.");
            put("userInfo", loginService.FindByEmail(user.getEmail()));
        }});
    }

    //    로그인 API
    @PostMapping(value = "/login")
    private ResponseEntity<?> UserLogIn(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {

//        Users 에 같은 이메일로 가입되어 있는 이메일이 있는지 체크
        Users users = loginService.FindByEmail(loginDTO.getEmail());
        Users password = loginService.FindByPassword(loginDTO.getPassword());

        if (users.getEmail().equals(loginDTO.getEmail()) && password.getPassword().equals(loginDTO.getPassword())) {
            try {
                Cookie cookie = new Cookie("winefind", loginService.CreateJWTToken(users));
                response.addCookie(cookie);

                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("Email", users.getEmail());
                    put("nickname", users.getNickname());
                    put("cookie", cookie);
                }});
            } catch (NullPointerException e) {
                return ResponseEntity.badRequest().body("error : " + e);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e);
            }

        }
        return ResponseEntity.badRequest().body("login fail");
    }


    //    로그아웃 API

    @GetMapping(value = "/logout")
    public ResponseEntity<?> UserSignOut(HttpServletResponse response) {
//        해당쿠키에서 "winefind" 키 값을 가진 쿠키를 찾고 제거

        Cookie cookie = new Cookie("winefind", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        if (cookie.getName() != "winefind") {
            return ResponseEntity.badRequest().body("not authorization");
        } else {
            return ResponseEntity.ok().body("Logged out successfully");
        }
    }

    @PutMapping(value = "/users")
    public ResponseEntity<?> UserUpdate(@RequestBody Users users) {
//        해당쿠키에서 "winefind" 키 값을 가진 쿠키를 찾고 제거
        loginService.UpdateUser(users);
        return ResponseEntity.ok().body(new HashMap<>() {{
            put("Update UserInfo", loginService.FindByEmail(users.getEmail()));
        }});

    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<?> UserDelete(@PathVariable Long id) {
//        해당쿠키에서 "winefind" 키 값을 가진 쿠키를 찾고 제거
        loginService.DeleteUser(id);
        return ResponseEntity.ok().body(new HashMap<>() {{
            put("UserInfo List", loginService.FindByAll());
        }});
    }


    //    현재 로그인 중인지를 판별!
    @GetMapping(value = "/auth")
    public ResponseEntity<?> CheckAuth(HttpServletRequest request) {

//        쿠키안에 "winefind" 토큰이 있는지 체크!
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
        Map<String, String> checkResult = loginService.CheckJWTToken(cookieUser);

        if (checkResult.get("email") != null) {

            Users getUser = loginService.FindByEmail(checkResult.get("email"));
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
}

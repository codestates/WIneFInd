package Apoint.WIneFInd.Service;


import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Users;
import Apoint.WIneFInd.Repository.LoginRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.util.*;

@Service
@Transactional
public class LoginService {

    private final static String SIGN_KEY = "apointkey";
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    //    유저 회원가입
    public Users CreateUser(SignupDTO signupDTO) {
        for (Users i : loginRepository.findAll()) {
            if (i.getEmail().equals(signupDTO.getEmail())) {
                return null;
            }
        }
        loginRepository.Create(signupDTO);
        return loginRepository.findByEmail(signupDTO.getEmail()).get(0);
    }


    //    유저 전체 리스트 보기
    public List<Users> FindByAll() {
        return loginRepository.findAll();
    }

//    //   id로 유저 아이디 찾기
//    public Users FindById(long id) {
//        return loginRepository.findById(id);
//    }

    //    입력 받은 이메일과 같은 이메일 찾기
    public Users FindByEmail(String email) {
        return loginRepository.findByEmail(email).get(0);
    }

    public Users FindByPassword(String password) {
        return loginRepository.findByPassword(password).get(0);
    }

    //    id를 이용해 유저 업데이트 하기
    public void UpdateUser(Users users) {
        loginRepository.Update(users);
    }

    //    id를 이용해 유저 삭제 하기
    public void DeleteUser(long id) {
        loginRepository.Delete(id);
    }

    //    JWT 토큰 만들기
    public String CreateJWTToken(Users user) {
        // 매개변수 user를 통해 전달 되는 데이터를 사용하여 토큰을 생성 후 값을 리턴합니다.
        // 토큰에는 "email", "username"이 담겨야합니다.
        // 토큰에 유효시간은 24시간입니다.
        // SIGN_KEY를 사용해야합니다.
        //TODO :
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("apoint")
                .setIssuedAt(now)
                .setSubject("user")
                .setExpiration(new Date(now.getTime() + Duration.ofDays(1).toMillis()))
                .claim("email", user.getEmail())
                .claim("nickname", user.getNickname())
                .signWith(SignatureAlgorithm.HS256, SIGN_KEY)
                .compact();
    }

    //    JWT 토큰 유효 체크
    public Map<String, String> CheckJWTToken(String key) {
        try {
            Claims claims = Jwts.parser().setSigningKey(SIGN_KEY)
                    .parseClaimsJws(key)
                    .getBody();

            String userEmail = (String) claims.get("email");
            String userNickname = (String) claims.get("nickname");
            return new HashMap<>() {{
                put("email", userEmail);
                put("nickname", userNickname);
                put("message", "토큰이 아직 살아있습니다.");
            }};

        } catch (ExpiredJwtException e) {
            return new HashMap<>() {{
                put("email", null);
                put("message", "토큰 시간이 만료 되었습니다.");
            }};
        } catch (JwtException e) {
            return new HashMap<>() {{
                put("email", null);
                put("message", "토큰이 유효하지 않습니다.");
            }};
        } catch (Exception e) {
            return new HashMap<>() {{
                put("message", "에러가 났습니다!" + null);
            }};
        }
    }


}

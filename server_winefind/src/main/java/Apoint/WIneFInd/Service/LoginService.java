package Apoint.WIneFInd.Service;


import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Users;
import Apoint.WIneFInd.Repository.LoginRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
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
//    public Users CreateUser(SignupDTO signupDTO) {
//        List<Users> list = loginRepository.findAll();
//        list.stream()
//                .filter(item -> item.getEmail().equals(signupDTO.getEmail()))
//                .findAny();
//
//        if (list != null) {
//            return null;
//        } else {
//            return loginRepository.Create(signupDTO);
//        }
//    }

    public Users CreateUser(SignupDTO signupDTO){
        for(Users users : loginRepository.findAll()){
            if(users.getEmail().equals(signupDTO.getEmail())){
                return null;
            }
        }
        loginRepository.Create(signupDTO);
        return loginRepository.findByEmail(signupDTO.getEmail()).get(0);
    }


    //    유저 리스트 보기
    public List<Users> FindByAll() {
        return loginRepository.findAll();
    }

    //   id로 유저 아이디 찾기
    public Users FindById(long id) {
        return loginRepository.findById(id).get(0);
    }

    public Users FindByEmail(String email) {
        return loginRepository.findByEmail(email).get(0);
    }

    //    id를 이용해 유저 업데이트 하기
    public Users UpdateUser(Users users) {
        return loginRepository.Update(users);
    }

    //    id를 이용해 유저 삭제 하기
    public void DeleteUser(long id) {
        loginRepository.Delete(id);
    }

    //    JWT 토큰 만들기
    public String CreateJWTToken(Users users) {

        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("apoint")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofDays(1).toMillis()))
                .claim("email", users.getEmail())
                .claim("nickname", users.getNickname())
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
            String userNickName = (String) claims.get("nickname");
            return new HashMap<>() {{
                put("email", userEmail);
                put("nickname", userNickName);
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

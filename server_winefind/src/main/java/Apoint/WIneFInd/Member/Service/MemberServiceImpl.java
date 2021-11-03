package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
    //as
    private final static String SIGN_KEY = "apoinkey";
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public User Save(SignUpDTO signUpDTO) {

        List<User> checkUser = memberRepository.findByEmail(signUpDTO.getEmail());
        if (!checkUser.isEmpty()) {
            return null;
        }

        User user = new User();
        Date now = new Date();

        user.setEmail(signUpDTO.getEmail());
        user.setPassword(signUpDTO.getPassword());
        user.setNickname(signUpDTO.getNickname());
        user.setImage("default Images");
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        return memberRepository.save(user);
    }

    @Override
    public List<User> FindAll() {

        return memberRepository.findAll();
    }

    @Override
    public User FindById(Long id) {

        return memberRepository.findById(id).get();
    }

    @Override
    public List<User> FindByEmail(String email) {

        return memberRepository.findByEmail(email);
    }

    @Override
    public List<User> LoginCheck(LoginDTO loginDTO) {

        List<User> checkEmail = memberRepository.findByEmail(loginDTO.getEmail());
        List<User> checkPwd = memberRepository.findByPassword(loginDTO.getPassword());

        // 입력받은 로그인과 비밀번호가 동일하면 로그인 성공
        if (loginDTO.getEmail().equals(checkEmail.get(0).getEmail()) && loginDTO.getPassword().equals(checkPwd.get(0).getPassword())) {
            return checkEmail;
        } else {
            return null;
        }
    }

    @Override
    public User Update(User user) {

        User updateUser = memberRepository.findById(user.getId()).get();

        Date now = new Date();

        updateUser.setEmail(user.getEmail());
        updateUser.setPassword(user.getPassword());
        updateUser.setNickname(user.getNickname());
        updateUser.setImage(user.getImage());
        updateUser.setCreatedAt(now);
        updateUser.setUpdatedAt(now);

        return memberRepository.save(updateUser);
    }

    @Override
    public List<User> Delete(Long id) {
        /*
        Consumer findConsumer = kakaoRepository.findById(id).get();

        List<Cart> byConsumer = cartRepository.findByConsumer(findConsumer);

        cartRepository.deleteAll(byConsumer);
    }*/

        memberRepository.deleteById(id);

//        User user = memberRepository.findById(id).get();
//        List<User> byEmail = memberRepository.findByEmail(user.getEmail());
//
//        memberRepository.deleteAll(byEmail);

        return memberRepository.findAll();
    }

    @Override
    public String CreateJWTToken(User user) {

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

    @Override
    public String CreateKaKao(String email, String nickname) {

        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("apoint")
                .setIssuedAt(now)
                .setSubject("kakao")
                .setExpiration(new Date(now.getTime() + Duration.ofDays(1).toMillis()))
                .claim("email", email)
                .claim("nickname", nickname)
                .signWith(SignatureAlgorithm.HS256, SIGN_KEY)
                .compact();
    }

    @Override
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

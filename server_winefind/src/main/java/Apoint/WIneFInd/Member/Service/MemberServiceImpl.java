package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import javax.transaction.Transactional;
import java.time.Duration;
import java.util.*;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
    //adsf
    private final static String SIGN_KEY = "apoinkey";
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // "User" 회원 가입
    @Override
    public User Save(SignUpDTO signUpDTO) {

        // "User" DB 에서 같은 "Email"이 존재 하는지 체크
        List<User> checkUser = memberRepository.findByEmail(signUpDTO.getEmail());
        if (!checkUser.isEmpty()) throw new NonUniqueResultException("가입양식에 맞춰 다시 기입하여 주시기 바랍니다.");

        User user = new User();
        Date now = new Date();

        // 유효성 검사가 통과하면 "User"정보 생성
        user = user.builder()
                .email(signUpDTO.getEmail())
                .password(signUpDTO.getPassword())
                .nickname(signUpDTO.getNickname())
                .image("default Images")
                .createdAt(now)
                .updatedAt(now)
                .build();

        // 저장
        return memberRepository.save(user);
    }

//    @Override
//    public List<User> FindAll() {
//
//        return memberRepository.findAll();
//    }
//
//    @Override
//    public User FindById(Long id) {
//
//        return memberRepository.findById(id).get();
//    }

    // "User_Email" 조회
    @Override
    public List<User> FindByEmail(String email) {

        return memberRepository.findByEmail(email);
    }

    // 로그인 유효성 검사
    @Override
    public List<User> LoginCheck(LoginDTO loginDTO) {

        // 유저 DB 안에 "Email"과 "Password"를 찾아 옵니다.
        List<User> checkEmail = memberRepository.findByEmail(loginDTO.getEmail());
        List<User> checkPwd = memberRepository.findByPassword(loginDTO.getPassword());

        // "Email"과 "Password"를 체크한 후에 동일하면 "Email" 실패하면 "Error"를 반환합니다.
        if (!(checkEmail.get(0).getEmail().equals(loginDTO.getEmail()) && checkPwd.get(0).getPassword().equals(loginDTO.getPassword()))){
            throw new NonUniqueResultException("'Email'과 'Password'를 다시 기입하여 주시기 바랍니다.");
        }

        return checkEmail;

    }

    // "User" 정보 수정
    @Override
    public User Update(User user) {

        // "User" DB 에서 입력받은 "User"와 같은 "User"조회
        User updateUser = memberRepository.findById(user.getId()).get();
        Date now = new Date();

        updateUser = updateUser.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .nickname(user.getNickname())
                .image(updateUser.getImage())
                .createdAt(now)
                .updatedAt(now)
                .build();

        // "User" 저장
        return memberRepository.save(updateUser);
    }

    @Override
    public List<User> Delete(Long id) {

        // "User" DB 에서 입력받은 id와 동일한 "User" 정보 삭제
        memberRepository.deleteById(id);

        // 남은 "User" 정보 출력
        return memberRepository.findAll();
    }

    // "User" JWT 토큰 생성
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

    // "KaKao" JWT 토큰 생성
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

    // JWT 토큰 검증
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

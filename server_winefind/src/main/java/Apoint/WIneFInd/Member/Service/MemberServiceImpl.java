package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.RoleType;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.*;

@Service
public class MemberServiceImpl implements MemberService {

    private final static String SIGN_KEY = "apoinkey";
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // "User" 회원 가입
    @Override
    @Transactional
    public User Save(SignUpDTO signUpDTO) {

        // "User" DB 에서 같은 "Email"이 존재 하는지 체크
        validateEmail(signUpDTO);

        Date now = new Date();

        // 유효성 검사가 통과하면 "User"정보 생성 role 은 기본적으로 "User"
        User user = createUser(signUpDTO, now);


        // 저장
        return memberRepository.save(user);
    }

    private User createUser(SignUpDTO signUpDTO, Date now) {
        User user = User.builder()
                .email(signUpDTO.getEmail())
                .password(signUpDTO.getPassword())
                .username(signUpDTO.getUsername())
                .image(signUpDTO.getImage())
                .role(RoleType.USER)
                .createdAt(now)
                .updatedAt(now)
                .build();
        return user;
    }

    private void validateEmail(SignUpDTO signUpDTO) {
        memberRepository.findByEmail(signUpDTO.getEmail())
                .ifPresent(m -> {
                    throw new NoSuchElementException("같은 'Email' 이 이미 존재 합니다. : " + signUpDTO.getEmail());
                });
    }

    // "User_Email" 조회
    @Override
    @Transactional(readOnly = true)
    public User FindByEmail(String email) {

        // DB 안에서 같은 이메일 찾아서 반환

        User byEmail = getEmail(email);

        return byEmail;
    }

    private User getEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 'email' 을 찾을 수가 없습니다." + email));
    }


    // 로그인 유효성 검사
    @Override
    @Transactional(readOnly = true)
    public User LoginCheck(LoginDTO loginDTO) {

        // 유저 DB 안에 "Email"과 "Password"를 찾아 옵니다.
        User chckUser = getEmail(loginDTO.getEmail());

        // 로그인 정보로 입벽받은 "Email"과 "Password"가 일치하는지 확인하고 맞지 않으면 Error 맞으면 리턴
        if (!(chckUser.getEmail().equals(loginDTO.getEmail()) && chckUser.getPassword().equals(loginDTO.getPassword()))) {
            throw new IllegalArgumentException("'Email' 과 'Password' 가 맞지 않습니다.");
        }
        // "Email"과 "Password"를 체크한 후에 동일하면 "Email" 실패하면 "Error"를 반환합니다.
        return chckUser;
    }

    // "User" 정보 수정
    @Override
    @Transactional
    public User Update(SignUpDTO signUpDTO, Long id) {

        // "User" DB 에서 입력받은 "User"와 같은 "User"조회
        User updateUser = getUserId(id);
        Date now = new Date();

        updateUser = updateUser(signUpDTO, updateUser, now);

        // "User" 저장
        return updateUser;
    }

    private User updateUser(SignUpDTO signUpDTO, User updateUser, Date now) {
        updateUser = updateUser.builder()
                .email(signUpDTO.getEmail())
                .password(signUpDTO.getPassword())
                .username(signUpDTO.getUsername())
                .image(updateUser.getImage())
                .updatedAt(now)
                .build();
        return updateUser;
    }

    private User getUserId(Long id) {
        User updateUser = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 'email' 을 찾을 수가 없습니다." + id));
        return updateUser;
    }


    @Override
    @Transactional
    public String Delete(Long id) {

        // "User" DB 에서 입력받은 id와 동일한 "User" 정보 삭제
        try {
            memberRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return ("삭제를 원하시면 'id' 를 다시 입력해 주세요 : " + e);
        }
        // 남은 "User" 정보 출력
        return "회원 정보가 정상적으로 삭제 되었습니다.";
    }

    // "User" JWT 토큰 생성
    @Override
    @Transactional
    public String CreateJWTToken(User user) {

        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("apoint")
                .setIssuedAt(now)
                .setSubject("user")
                .setExpiration(new Date(now.getTime() + Duration.ofDays(1).toMillis()))
                .claim("email", user.getEmail())
                .claim("username", user.getUsername())
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

            String email = (String) claims.get("email");
            String username = (String) claims.get("username");
            return new HashMap<>() {{
                put("email", email);
                put("username", username);
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
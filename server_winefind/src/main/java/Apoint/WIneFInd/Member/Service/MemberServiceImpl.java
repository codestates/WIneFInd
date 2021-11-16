package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.RoleType;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.*;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final static String SIGN_KEY = "apoinkey";
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // "User" 회원 가입
    @Override
    public User Save(SignUpDTO signUpDTO) {

        try {
            // "User" DB 에서 같은 "Email"이 존재 하는지 체크
            validateEmail(signUpDTO);

            Date now = new Date();

            // 유효성 검사가 통과하면 "User"정보 생성  role 은 기본적으로 "User"로 생성
            // 비밀번호는 Bcrypt를 이용한 단방향 암호로 저장
            String encodePass = passwordEncoder.encode(signUpDTO.getPassword());
            String defaultPass = passwordEncoder.encode("0000");
            System.out.println("defaultPass = " + defaultPass);
            User user = User.builder()
                    .email(signUpDTO.getEmail())
                    .password(encodePass)
                    .username(signUpDTO.getUsername())
                    .image("https://mywinefindimagebucket.s3.ap-northeast-2.amazonaws.com/default_img.png")
                    .role(RoleType.USER)
                    .createdAt(now)
                    .updatedAt(now)
                    .build();

            // 저장
            return memberRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("회원가입 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }
    }

    private void validateEmail(SignUpDTO signUpDTO) {
        memberRepository.findByEmail(signUpDTO.getEmail())
                .ifPresent(m -> {
                    throw new IllegalArgumentException("중복 회원 입니다 원하는 결과를 얻으시려면 email : "
                            + signUpDTO.getEmail() + " 를 제외한 'email' 를 다시 입력해 주세요. ");
                });
    }

    // "User_Id" 조회
    @Override
    @Transactional(readOnly = true)
    public User FindById(Long id) {

        // 유저를 DB 안에서 찾을시 없으면 에러 있으면 와인 리턴
        User user = getUserId(id);

        return user;
    }

    private User getUserId(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 id : " + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");
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
        return memberRepository.findByEmail(email).orElseThrow(() -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 email : " + email + " 를 제외한 'email' 를 다시 입력해 주세요. ");
        });
    }


    // 로그인 유효성 검사
    @Override
    @Transactional(readOnly = true)
    public User LoginCheck(LoginDTO loginDTO) {

        // 유저 DB 안에 "Email"과 "Password"를 찾아 옵니다.
        User chckUser = getEmail(loginDTO.getEmail());

        // 로그인 정보로 입벽받은 "Email" 이 존재하는지 판별
        if (chckUser.getEmail() == null) {
            throw new IllegalArgumentException("해당 'Email' 이 존재 하지 않습니다.");
        }

        // 관리자 일경우엔 바로 로그인
        if (chckUser.getPassword().equals("0000")) {
            return chckUser;
        }

        // 기존의 해쉬값으로 저장된 비밀번호와 loginDTO 로 들어온 비밀번호를 비교하여 true false 판별
        boolean check = passwordEncoder.matches(loginDTO.getPassword(), chckUser.getPassword());
        // "Email"과 "Password"를 체크한 후에 동일하면 "Email" 실패하면 "Error"를 반환합니다.

        // 비밀번호가 일치하면 유저를 리턴하고 틀렸다면 에러 발생
        if (check) {
            return chckUser;
        } else {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다 다시 입력해 주십시오.");
        }


    }

    // "User" 정보 수정
    @Override
    public User Update(SignUpDTO signUpDTO, Long id) {

        // "User" DB 에서 입력받은 "User"와 같은 "User"조회
        User updateUser = getUserId(id);
        Date now = new Date();

        updateUser.setEmail(signUpDTO.getEmail());
        updateUser.setPassword(signUpDTO.getPassword());
        updateUser.setUsername(signUpDTO.getUsername());
        updateUser.setImage(signUpDTO.getImage());
        updateUser.setUpdatedAt(now);

        // "User" 저장
        return updateUser;
    }

    @Override
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

            // return new 방식으로 하면 Controller 에서 put 을 안해도 되나? 나중에 실험해보기
            return new HashMap<>() {{
                put("email", email);
                put("username", username);
            }};

        } catch (NullPointerException e) {
            throw new NullPointerException("token 값으로 Null 값이 들어왔습니다 다시 보내주세요 " + e);
        }
    }
}
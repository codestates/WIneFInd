package Apoint.WIneFInd.Kakao.Service;


import Apoint.WIneFInd.Kakao.Model.KakaoProfile;
import Apoint.WIneFInd.Kakao.Model.OAuthToken;
//import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;

import Apoint.WIneFInd.Member.Model.RoleType;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class KakaoServiceImpl implements KakaoService {

    public final MemberRepository memberRepository;

    @Autowired
    public KakaoServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public User Create(String code) {

        // 1번 인증코드 요청 전달
        String accessToken = getAccessToken(code);

        // accessToken이 잘 받아와 졌는지 확인
        if (accessToken == null) {
            throw new NullPointerException("NO access Token");
        }

        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = getUserInfo(accessToken);

        // userInfo 가 잘받아 왔는지를 체크
        if (userInfo == null) {
            throw new NullPointerException("NO userInfo");
        }

        // 콘솔창에 받아온 userInfo 출력
        System.out.println("login info : " + userInfo.toString());

        // userInfo 안에 있는 값들을 형변환을 통해서 저장
        String email = (String) userInfo.get("email");
        String username = (String) userInfo.get("username");

//        if(email != null) {
//            email = String "geust";
//        }

        // 카카오 로그인으로 회원가입을 위해 먼저 같은 이메일로 가입한적이 있는지
        // 를 위한 유효성체크 통과하지 못하면 throw
        memberRepository.findByEmail(email).ifPresent(m -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 email : "
                    + email + " 를 제외한 'email' 를 다시 입력해 주세요. ");
        });

        // 유효성 검사는 통과하면 유저 객체 안에 저장
        Date now = new Date();
        User user = User.builder()
                .email(email)
                .username(username)
                .role(RoleType.KAKAO)
                .password("0000")
                .image("default Image")
                .createdAt(now)
                .updatedAt(now)
                .build();

        return memberRepository.save(user);
    }

    // 클라이언트에서 인가코드를 받아온뒤 해당 코드를 사용하여 카카오 로부터
    // AccessToken 받아오기
    @Override
    @Transactional
    public String getAccessToken(String code) {

        // 카카오 client_id, redirect_uri, reqURL 를 변수에 담아놓고 사용하기
        String client_id = "c936006613666667da816aebf5f62b69";
        String redirect_uri = "https://localhost:3000/kakao";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        // 스프링에서 제공하는 http 통신에 유용하게 쓸 수 있는 템플릿사용
        // getAccessToken 에 맞춰서 사용
        RestTemplate getAccess = new RestTemplate();

        // 카카오에서 요구하는 양식에 맞춰서 HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // MultiValueMap 을 통하여 카카오에서 요구하는 데이터를 담을 HttpBody 작성
        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("grant_type", "authorization_code");
        multiValueMap.add("client_id", client_id);
        multiValueMap.add("redirect_uri", redirect_uri);
        multiValueMap.add("code", code);

        // 위에서 작성 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(multiValueMap, headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getAccess.exchange(reqURL, HttpMethod.POST, tokenRequest, String.class);

        // 응답받은 데이터들을 파싱하기 위해서  Jackson 라이브러리의 ObjectMapper 사용
        ObjectMapper objectMapper = new ObjectMapper();

        OAuthToken oAuthToken = null;
        try {
            // 응답받은 내용을 OAuthToken 양식에 맞춰서 파싱
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            System.out.println("AccessToken 을 파싱하는대 실패를 하였습니다. 양식을 다시한번 확인해 주세요 " + e);
        }

        // 파싱한 내용이 잘 들어왔는지 콘솔로그로 확인
        System.out.println("카카오 엑세스 토큰 :" + oAuthToken.getAccess_token());

        // Access_token 리턴
        return oAuthToken.getAccess_token();
    }

    @Override
    @Transactional
    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";

        System.out.println("userinfo 진입 했니??? ");

        // getUserInfo 를 얻기 위한 기본 양식으로 사용
        RestTemplate getUser = new RestTemplate();

        // 카카오 에서 요구하는 양식에 맞춰서 HttpHeader 생성
        // ! 주의 Bearer 앞에 공백으로 한칸 뛰어 놓는거 잊지 않기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 위에서 작성한 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> kakaoUser = new HttpEntity<>(headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getUser.exchange(reqUrl, HttpMethod.POST, kakaoUser, String.class);

        System.out.println("여기까지 왔니?======================================= ");
        // response 된 데이터를 출력
        System.out.println("response got body " + response.getBody());

        // 카카오에서 보내용 유저정보를 파싱하기위해서 생성
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            System.out.println("1111======================================= ");

            // kakaoProfile 양식에 맞춰서 데이터들을 파싱
            kakaoProfile = objectMapper.readValue(response.getBody(), KakaoProfile.class);
            System.out.println("22222======================================= ");
        } catch (JsonProcessingException e) {
            System.out.println("UserInfo를 파싱하는대 실패를 하였습니다. 양식을 다시한번 확인해 주세요 " + e);
        }

        // 파싱된 내용을 추출하여 저장
        String email = kakaoProfile.getKakao_account().getEmail();
        String username = kakaoProfile.getProperties().getNickname();

        // 값이 잘 나오는지를 확인
        System.out.println(email);
        System.out.println(username);

        System.out.println("userinfo 끝맞쳤니???? ");

        // userInfo 에 값을 저장후 리턴
        userInfo.put("email", email);
        userInfo.put("username", username);

        return userInfo;
    }

}

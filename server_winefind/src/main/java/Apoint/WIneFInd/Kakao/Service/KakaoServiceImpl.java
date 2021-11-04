package Apoint.WIneFInd.Kakao.Service;


import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Model.KakaoProfile;
import Apoint.WIneFInd.Kakao.Model.OAuthToken;
//import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;

import Apoint.WIneFInd.Member.Model.RoleType;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import Apoint.WIneFInd.Member.Service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class KakaoServiceImpl implements KakaoService {

//    private final KakaoRepository kakaoRepository;
    public final MemberRepository memberRepository;

//    @Autowired
//    public KakaoServiceImpl(KakaoRepository kakaoRepository, MemberRepository memberRepository) {
//        this.kakaoRepository = kakaoRepository;
//        this.memberRepository = memberRepository;
//    }


    public KakaoServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public User Create(String code) {

        // 1번 인증코드 요청 전달
        String accessToken = getAccessToken(code);

        if (accessToken == null) {
            throw new NullPointerException("NO access Token");
        }

        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = getUserInfo(accessToken);
        if (userInfo == null) {
            throw new NullPointerException("NO userInfo");
        }

        System.out.println("login info : " + userInfo.toString());


        String email = (String) userInfo.get("email");
        String username = (String) userInfo.get("username");

//        if(email != null) {
//            email = String "geust";
//        }

        memberRepository.findByEmail(email).ifPresent(m -> {
            throw new NoSuchElementException("같은 'Email' 이 이미 존재 합니다. : ");
        });


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

    @Override
    @Transactional
    public String getAccessToken(String code) {
        String client_id = "c936006613666667da816aebf5f62b69";
        String redirect_uri = "https://localhost:3000/kakao";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        RestTemplate getAccess = new RestTemplate();
        // 카카오 양식에 맞춰 HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("grant_type", "authorization_code");
        multiValueMap.add("client_id", client_id);
        multiValueMap.add("redirect_uri", redirect_uri);
        multiValueMap.add("code", code);

        // HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(multiValueMap, headers);

        // Http POST 방식으로 요청하기
        ResponseEntity<String> response = getAccess.exchange(reqURL, HttpMethod.POST, tokenRequest, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("카카오 엑세스 토큰 :" + oAuthToken.getAccess_token());

        return oAuthToken.getAccess_token();
    }

    @Override
    @Transactional
    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";

        System.out.println("userinfo 진입 했니??? ");

        RestTemplate getUser = new RestTemplate();

        // 카카오 양식에 맞춰 HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> kakaoUser = new HttpEntity<>(headers);

        // Http POST 방식으로 요청하기
        ResponseEntity<String> response = getUser.exchange(reqUrl, HttpMethod.POST, kakaoUser, String.class);

        System.out.println("======================================= ");
        System.out.println("reponst got body " + response.getBody());


        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            System.out.println("1111======================================= ");

            kakaoProfile = objectMapper.readValue(response.getBody(), KakaoProfile.class);
            System.out.println("22222======================================= ");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        String email = kakaoProfile.getKakao_account().getEmail();
        String username = kakaoProfile.getProperties().getNickname();

        System.out.println(email);
        System.out.println(username);

        System.out.println("userinfo 끝맞쳤니???? ");

        userInfo.put("email", email);
        userInfo.put("username", username);
        return userInfo;
    }

}

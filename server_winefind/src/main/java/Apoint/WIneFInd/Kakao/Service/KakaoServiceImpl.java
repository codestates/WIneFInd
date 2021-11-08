package Apoint.WIneFInd.Kakao.Service;


import Apoint.WIneFInd.Kakao.Domain.KaKaoPayDTO;
import Apoint.WIneFInd.Kakao.Model.*;
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
    private static final String admin = "542d1e3eb38aa8f2ba0f0ad3980f3dc2";
    private static final String client_id = "c936006613666667da816aebf5f62b69";

    private KaKaoPayment kaKaoPayment;
    private OAuthToken oAuthToken;
    private KaKaoPay kaKaoPay;

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
        if (accessToken == null) throw new NullPointerException("NO access Token");

        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = getUserInfo(accessToken);

        // userInfo 가 잘받아 왔는지를 체크
        if (userInfo == null) throw new NullPointerException("NO userInfo");

        // 콘솔창에 받아온 userInfo 출력
        System.out.println("login info : " + userInfo.toString());

        // userInfo 안에 있는 값들을 형변환을 통해서 저장
        String email = (String) userInfo.get("email");
        String username = (String) userInfo.get("username");

//        if(email != null) {
//            email = String "geust";
//        }

        // ifPresent 나 isPresent 로는 리턴이 안됨... 추후 조금더 알아보기
//        memberRepository.findByEmail(email).ifPresent(m -> {
//            return m;
//            throw new IllegalArgumentException("원하는 결과를 얻으시려면 email : "
//                    + email + " 를 제외한 'email' 를 다시 입력해 주세요. ");
//        });

        // 위에서 받아온 데이터를 기반으로 동일한 이메일이 있는지 DB 내에서 검색
        Optional<User> getUserCheck = memberRepository.findByEmail(email);

        // 카카오 로그인으로 회원가입을 위해 먼저 같은 이메일로 가입한적이 있는지 체크
        // 이미 가입되어 있는 회원이면 로그인 진행 가입되어 있지 않으면 새로운 유저 생성
        if (!getUserCheck.isEmpty()) {
            return getUserCheck.get();
        }

        // 유효성 검사 통과하면 유저 객체 안에 저장
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

        // 카카오 reqURL, client_id, redirect_uri, 를 변수에 담아놓고 사용하기
        String reqURL = "https://kauth.kakao.com/oauth/token";
        String redirect_uri = "http://localhost:3000/kakao";
//        String redirect_uri = "http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com/kakao.html";

        // 스프링에서 제공하는 http 통신에 유용하게 쓸 수 있는 템플릿사용
        // getAccessToken 에 맞춰서 사용
        RestTemplate getAccess = new RestTemplate();

        // 카카오에서 요구하는 양식에 맞춰서 HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // MultiValueMap 을 통하여 카카오에서 요구하는 데이터를 담을 HttpBody 작성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", client_id);
        body.add("redirect_uri", redirect_uri);
        body.add("code", code);

        // 위에서 작성 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(body, headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getAccess.exchange(reqURL, HttpMethod.POST, tokenRequest, String.class);

        // 응답받은 데이터들을 파싱하기 위해서  Jackson 라이브러리의 ObjectMapper 사용
        ObjectMapper objectMapper = new ObjectMapper();
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

    // 카카오 유저정보 받아오기
    @Override
    @Transactional
    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";

        System.out.println("getUserInfo 진입 했니??? ");

        // getUserInfo 를 얻기 위한 기본 양식으로 사용
        RestTemplate getUser = new RestTemplate();

        // 카카오 에서 요구하는 양식에 맞춰서 HttpHeader 생성
        // ! 주의 Bearer 앞에 공백으로 한칸 뛰어 놓는거 잊지 않기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 위에서 작성한 HttpHeader HttpBody 담기
        HttpEntity<MultiValueMap<String, String>> userRequest = new HttpEntity<>(headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getUser.exchange(reqUrl, HttpMethod.POST, userRequest, String.class);

        System.out.println("여기까지 왔니?======================================= ");
        // response 된 데이터를 출력
        System.out.println("response got body " + response.getBody());

        // 카카오에서 보내용 유저정보를 파싱하기위해서 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // 혹시라도 딴대 쓸일 있을때 전역으로 관리하기
        KakaoProfile kakaoProfile = null;
        try {
            System.out.println("1111======================================= ");

            // kakaoProfile 양식에 맞춰서 데이터들을 파싱
            kakaoProfile = objectMapper.readValue(response.getBody(), KakaoProfile.class);
            System.out.println("22222======================================= ");
        } catch (JsonProcessingException e) {
            System.out.println("userInfo 를 파싱하는대 실패를 하였습니다. 양식을 다시한번 확인해 주세요 " + e);
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

    @Override
    @Transactional
    public String getLogout() {

        String reqUrl = "https://kapi.kakao.com/oauth/token";

        System.out.println("userLogout 진입 했니??? ");

        // getUserInfo 를 얻기 위한 기본 양식으로 사용
        RestTemplate getLogout = new RestTemplate();

        OAuthToken oAuthToken = new OAuthToken();
        System.out.println(oAuthToken.getAccess_token());
        // 카카오 에서 요구하는 양식에 맞춰서 HttpHeader 생성
        // ! 주의 Bearer 앞에 공백으로 한칸 뛰어 놓는거 잊지 않기!
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccess_token());

        HttpEntity<MultiValueMap<String, String>> logoutRequest = new HttpEntity<>(headers);

        // 요청보낼 주소와, POST 매소드, HttpHead HttpBody , 응답받을 형식 String 작성
        ResponseEntity<String> response = getLogout.exchange(reqUrl, HttpMethod.POST, logoutRequest, String.class);

        System.out.println("로그아웃된 사용자 회원번호는 : " + response.getBody());


        return "카카오 로그아웃이 성공 했습니다.";
    }

    @Override
    public String KaKaoPay() {

        String reqUrl = "https://kapi.kakao.com/v1/payment/ready";

        kaKaoPay = KaKaoPay.builder()
                .cid("TC0ONETIME")
                .partner_order_id("1001")
                .partner_user_id("stella")
                .item_name("맥북 M1 최신형을 단돈100원에! 사기 아닙니다!")
                .quantity("10")
                .total_amount("100")
                .tax_free_amount("0")
                .approval_url("https://localhost:4000/kakao/success")
                .cancel_url("https://localhost:4000/kakao/cancel")
                .fail_url("https://localhost:4000/kakao/fail")
                .build();

        RestTemplate kakaoPayTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + admin);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> bodys = new LinkedMultiValueMap<>();
        bodys.add("cid", kaKaoPay.getCid());
        bodys.add("partner_order_id", kaKaoPay.getPartner_order_id());
        bodys.add("partner_user_id", kaKaoPay.getPartner_user_id());
        bodys.add("item_name", kaKaoPay.getItem_name());
        bodys.add("quantity", kaKaoPay.getQuantity());
        bodys.add("total_amount", kaKaoPay.getTotal_amount());
        bodys.add("tax_free_amount", kaKaoPay.getTax_free_amount());
        bodys.add("approval_url", kaKaoPay.getApproval_url());
        bodys.add("cancel_url", kaKaoPay.getCancel_url());
        bodys.add("fail_url", kaKaoPay.getFail_url());


        HttpEntity<MultiValueMap<String, String>> paymentRequest = new HttpEntity<>(bodys, headers);

        ResponseEntity<String> response = kakaoPayTemplate.exchange(reqUrl, HttpMethod.POST, paymentRequest, String.class);

        System.out.println("response got body " + response.getBody());

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            System.out.println("카카오 페이========================================================");
            kaKaoPayment = objectMapper.readValue(response.getBody(), KaKaoPayment.class);
            System.out.println("kaKaoPayment.getNext_redirect_pc_url() 들어왔니?? " + kaKaoPayment.getNext_redirect_pc_url());
            return kaKaoPayment.getNext_redirect_pc_url();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kaKaoPayment.getNext_redirect_pc_url();
    }

    @Override
    public String KakaoaAprove(String pg_token) {

        String reqUrl = "https://kapi.kakao.com/v1/payment/approve";

        System.out.println("=======================================pg_token" + pg_token);
        KakaoApprove kakaoApprove = KakaoApprove.builder()
                .cid("TC0ONETIME")
                .tid(kaKaoPayment.getTid())
                .partner_order_id(kaKaoPay.partner_order_id)
                .partner_user_id(kaKaoPay.partner_user_id)
                .build();

        RestTemplate kakaoaAproveTempl = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + admin);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        MultiValueMap<String, String> kakaoAproveBody = new LinkedMultiValueMap<>();

        kakaoAproveBody.add("cid", kakaoApprove.getCid());
        kakaoAproveBody.add("tid", kakaoApprove.getTid());
        kakaoAproveBody.add("partner_order_id", kakaoApprove.getPartner_order_id());
        kakaoAproveBody.add("partner_user_id", kakaoApprove.getPartner_user_id());
        kakaoAproveBody.add("pg_token", pg_token);

        HttpEntity<MultiValueMap<String, String>> kakaoaAproveReq = new HttpEntity<>(kakaoAproveBody, headers);

        ResponseEntity<String> response = kakaoaAproveTempl.exchange(reqUrl, HttpMethod.POST, kakaoaAproveReq, String.class);

        return response.getBody();
    }
}

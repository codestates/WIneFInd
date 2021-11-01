package Apoint.WIneFInd.Kakao.Service;


import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;

import Apoint.WIneFInd.Member.Service.MemberService;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

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

    private final KakaoRepository kakaoRepository;
    public final MemberService memberService;

    public KakaoServiceImpl(KakaoRepository kakaoRepository, MemberService memberService) {
        this.kakaoRepository = kakaoRepository;
        this.memberService = memberService;
    }

    @Override
    public Consumer Create(String code, HttpServletResponse response) {

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

        String jwtEmail = (String) userInfo.get("email");
        String jwtNickname = (String) userInfo.get("nickname");

        String KakaoOAuth = memberService.CreateKaKao(jwtEmail, jwtNickname);

        Cookie cookie = new Cookie("Kakao", KakaoOAuth);
        response.addCookie(cookie);

//        if (userInfo.get("email") != null) {
//            session.setAttribute("userId", userInfo.get("email"));
//            session.setAttribute("accessToken", accessToken);
//        }

        String email = userInfo.get("email").toString();
        String nickname = userInfo.get("nickname").toString();


        for (Consumer i : FindByAll()) {
            if (i.getEmail().equals(email)) {
                throw new NullPointerException("동일한 아이디가 존재 합니다.");
                // 쓰로우로 리턴 null 대신 널포인트로 던지는거 가능한지 확인
//                return null;
            }
        }

        Date now = new Date();
        Consumer consumer = new Consumer();
        consumer = consumer.builder()
                .nickname(nickname)
                .email(email)
                .createdAt(now)
                .updatedAt(now)
                .build();

//        consumer.setNickname(nickname);
//        consumer.setCreatedAt(now);
//        consumer.setEmail(email);
//        consumer.setUpdatedAt(now);

        return kakaoRepository.save(consumer);
    }

    @Override
    public String getAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=c936006613666667da816aebf5f62b69");
            sb.append("&redirect_uri=https://localhost:3000/kakao");
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            System.out.println("response code = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body=" + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return accessToken;
    }


    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) {
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqUrl = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode =" + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));


            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body =" + result);


            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return userInfo;
    }

//    @Override
//    public void kakaoLogout(String accessToken) {
//        String reqURL = "http://kapi.kakao.com/v1/user/logout";
//        try {
//            URL url = new URL(reqURL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode = " + responseCode);
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//
//            String result = "";
//            String line = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println(result);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    @Override
    public List<Consumer> FindByAll() {
        return kakaoRepository.findAll();
    }

    @Override
    public Optional<Consumer> FindById(Long id) {
        return kakaoRepository.findById(id);
    }

    @Override
    public List<Consumer> FindByEmail(String email) {
        return kakaoRepository.findByEmail(email);
    }

    @Override
    public void Delete(Long id) {
        kakaoRepository.deleteById(id);
    }
}

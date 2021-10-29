package Apoint.WIneFInd.Kakao.Service;


import Apoint.WIneFInd.Kakao.Controller.KakaoAPI;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class KakaoServiceImpl implements KakaoService {

    private final KakaoRepository kakaoRepository;

    public KakaoServiceImpl(KakaoRepository kakaoRepository) {
        this.kakaoRepository = kakaoRepository;
    }

    @Override
    public Consumer Create(String code, HttpSession session) {

        KakaoAPI kakaoApi = new KakaoAPI();
        // 1번 인증코드 요청 전달
        String accessToken = kakaoApi.getAccessToken(code);
        if (accessToken == null) {
            throw new NullPointerException("NO access Token");
        }
        // 2번 인증코드로 토큰 전달
        HashMap<String, Object> userInfo = kakaoApi.getUserInfo(accessToken);
        if (userInfo == null) {
            throw new NullPointerException("NO userInfo");
        }

        System.out.println("login info : " + userInfo.toString());

        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("accessToken", accessToken);
        }

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
        consumer.setEmail(email);
        consumer.setNickname(nickname);
        consumer.setCreatedAt(now);
        consumer.setUpdatedAt(now);

        return kakaoRepository.save(consumer);
    }

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
}

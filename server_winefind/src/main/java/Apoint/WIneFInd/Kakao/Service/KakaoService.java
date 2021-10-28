package Apoint.WIneFInd.Kakao.Service;

import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class KakaoService {

    private final KakaoRepository kakaoRepository;

    public KakaoService(KakaoRepository kakaoRepository) {
        this.kakaoRepository = kakaoRepository;
    }


    public String CreateConsumer(String code, HttpSession session) {

        if (kakaoRepository.Create(code, session) == "Create Success") {
            return "Create Success";
        } else if (kakaoRepository.Create(code, session) == "NO userInfo") {
            return "NO userInfo";
        } else if (kakaoRepository.Create(code, session) == "NO access Token") {
            return "NO access Token";
        } else {
            return null;
        }
    }
}
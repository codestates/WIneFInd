package Apoint.WIneFInd.Service;

import Apoint.WIneFInd.Repository.KakaoRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

@Service
@Transactional
public class KakaoService {

    private final KakaoRepository kakaoRepository;

    public KakaoService(KakaoRepository kakaoRepository) {
        this.kakaoRepository = kakaoRepository;
    }

    public void CreateConsumer(String code, HttpSession session){

        kakaoRepository.Create(code,session);
    }


}

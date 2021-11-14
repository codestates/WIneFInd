package Apoint.WIneFInd.Kakao.Service;



import Apoint.WIneFInd.Kakao.Domain.KaKaoPayDTO;
import Apoint.WIneFInd.Member.Model.User;

import java.util.HashMap;

public interface KakaoService {

    public User Create(String code);

    public Object getAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

    public String getLogout();

    public String KaKaoPay(KaKaoPayDTO kaKaoPayDTO);

    public String KakaoAprove(String pg_token);
}
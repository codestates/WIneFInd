package Apoint.WIneFInd.Kakao.Service;



import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Member.Model.User;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface KakaoService {

    public User Create(String code);

    public Object getAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

}
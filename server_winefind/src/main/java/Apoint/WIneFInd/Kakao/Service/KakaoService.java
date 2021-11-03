package Apoint.WIneFInd.Kakao.Service;



import Apoint.WIneFInd.Kakao.Model.Consumer;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


public interface KakaoService {
    //as
    public Consumer Create(String code, HttpServletResponse response);

    public List<Consumer> FindByAll();

    public Optional<Consumer> FindById(Long id);

    public List<Consumer> FindByEmail(String email);

    public void Delete(Long id);

    public String getAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

}
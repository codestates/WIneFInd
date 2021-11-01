package Apoint.WIneFInd.Kakao.Service;



import Apoint.WIneFInd.Kakao.Model.Consumer;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;


public interface KakaoService {

    public Consumer Create(String code, HttpSession session);

    public List<Consumer> FindByAll();

    public Optional<Consumer> FindById(Long id);

    public List<Consumer> FindByEmail(String email);
}
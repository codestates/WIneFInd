package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;

import java.util.List;
import java.util.Map;

public interface MemberService {

    public User Save(SignUpDTO signUpDTO);

    public List<User> FindByEmail(String email);

    public User Update(User user);

    public List<User> Delete(Long id);

    public List<User> LoginCheck(LoginDTO loginDTO);

    public String CreateJWTToken(User user);

    public Map<String, String> CheckJWTToken(String key);

    public String CreateKaKao(String email, String nickname);
}

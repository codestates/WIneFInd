

package Apoint.WIneFInd.Member.Service;

import Apoint.WIneFInd.Member.Domain.LoginDTO;
import Apoint.WIneFInd.Member.Domain.SignUpDTO;
import Apoint.WIneFInd.Member.Model.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MemberService {

    // 저장
    public User Save(SignUpDTO signUpDTO);
    // User Id 찾기
    public User FindById(Long id);
    // User Email 찾기
    public User FindByEmail(String email);
    // User 업데이트
    public User Update(SignUpDTO signUpDTO, Long id);
    // User 삭제
    public String Delete(Long id);
    // User 로그인 체크
    public User LoginCheck(LoginDTO loginDTO);
    // JWT 토큰 생성
    public String CreateJWTToken(User user);
    // JWT 토큰 채크
    public Map<String, String> CheckJWTToken(String key);
}
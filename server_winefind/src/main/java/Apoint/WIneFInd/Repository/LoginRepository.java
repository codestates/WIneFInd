package Apoint.WIneFInd.Repository;

import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Users;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class LoginRepository {

    private final EntityManager entityManager;

    @Autowired
    public LoginRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    //    유저 회원가입
    public void Create(SignupDTO signupDTO) {
//        유저 엔티티 생성
        Users users = new Users();
//        현재 시각 생성
        Date now = new Date();

        users.setEmail(signupDTO.getEmail());
        users.setNickname(signupDTO.getNickname());
        users.setPassword(signupDTO.getPassword());
        users.setUserImage("default Image");
        users.setCreatedAt(now);
        users.setUpdatedAt(now);

        entityManager.persist(users);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 리스트 검색
    public List<Users> findAll() {

        return entityManager.createQuery("SELECT u FROM Users AS u ", Users.class).getResultList();
    }

    //    유저 아이디 선택해서 찾기
    public List<Users> findById(long id) {

        return entityManager.createQuery("SELECT u FROM Users AS u WHERE u.email '" + id + "'", Users.class).getResultList();

    }

    public List<Users> findByEmail(String email) {

        return entityManager.createQuery("SELECT u FROM Users AS u WHERE u.email '" + email + "'", Users.class).getResultList();
    }

    //    유저 아이디를 이용하여 업데이트
    public Users Update(Users users) {
        Users updateUser = findById(users.getId()).get(0);

        Date now = new Date();
        updateUser.setEmail(users.getEmail());
        updateUser.setNickname(users.getNickname());
        updateUser.setPassword(users.getPassword());
        updateUser.setUserImage(users.getUserImage());
        updateUser.setCreatedAt(now);
        updateUser.setCreatedAt(now);

        entityManager.persist(updateUser);
        entityManager.flush();
        entityManager.close();

        return updateUser;
    }

    //    유저 아이디를 이용하여 삭제
    public void Delete(long id) {
        Users users = findById(id).get(0);
        entityManager.remove(users);
        entityManager.close();
    }
}

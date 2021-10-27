package Apoint.WIneFInd.Repository;

import Apoint.WIneFInd.Domain.SignupDTO;
import Apoint.WIneFInd.Model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

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

        Users user = new Users();

        Date now = new Date();

        user.setEmail(signupDTO.getEmail());
        user.setPassword(signupDTO.getPassword());
        user.setNickname(signupDTO.getNickname());
        user.setImage("resources/default.jpeg");
        user.setUpdatedAt(now);
        user.setCreatedAt(now);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 리스트 검색
    public List<Users> findAll() {
        // DB service_user 테이블에 모든 유저 정보를 리턴합니다.
        // TODO :
        return entityManager.createQuery("SELECT u FROM Users u", Users.class).getResultList();
    }

    //    유저 아이디 선택해서 찾기
    public Users findById(long id) {
        List<Users> list = entityManager
                .createQuery("SELECT user FROM Users as user WHERE user.id='" + id + "'", Users.class)
                .getResultList();
        entityManager.close();
        return list.get(0);
    }


    public List<Users> findByEmail(String email) {
        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
        return entityManager.createQuery("SELECT u FROM Users u WHERE u.email = '" + email + "'", Users.class).getResultList();
    }

    public List<Users> findByPassword(String password) {
        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
        return entityManager.createQuery("SELECT u FROM Users u WHERE u.password = '" + password + "'", Users.class).getResultList();
    }

    //    유저 아이디를 이용하여 업데이트
    public void Update(Users users) {

        Users updateUser = findById(users.getId());
        Date now = new Date();

        updateUser.setEmail(users.getEmail());
        updateUser.setNickname(users.getNickname());
        updateUser.setPassword(users.getPassword());
        updateUser.setImage(users.getImage());
        updateUser.setCreatedAt(now);
        updateUser.setCreatedAt(now);

        entityManager.persist(updateUser);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 아이디를 이용하여 삭제
    public void Delete(long id) {
        Users users = findById(id);
        entityManager.remove(users);
        entityManager.close();
    }
}

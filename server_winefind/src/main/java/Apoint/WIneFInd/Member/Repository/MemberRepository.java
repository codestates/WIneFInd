package Apoint.WIneFInd.Member.Repository;

import Apoint.WIneFInd.Member.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<User, Long> {
    //as
    List<User> findByEmail(String email);

    List<User> findByPassword(String pwd);

}

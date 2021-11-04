package Apoint.WIneFInd.Recommend.Repository;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Recommend.Model.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    List<Recommend> findByUser(User user);
}

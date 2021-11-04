package Apoint.WIneFInd.Recommended.Repository;

import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendedRepository extends JpaRepository<Recommended, Long> {

    List<Recommended> findByUser(User user);
}

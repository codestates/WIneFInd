package Apoint.WIneFInd.Recommend.Repository;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Recommend.Model.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//ahah
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    List<Recommend> findByConsumer(Consumer consumer);
}

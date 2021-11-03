package Apoint.WIneFInd.Kakao.Repoistory;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KakaoRepository extends JpaRepository<Consumer, Long> {
    List<Consumer> findByEmail(String email);
//ahah
}

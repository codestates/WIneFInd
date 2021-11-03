package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Model.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface WineRepository extends JpaRepository<Wine, Long>, QuerydslPredicateExecutor<Wine>, WineRepositoryCustom {
    //adsf
    Wine findByWineName(String wineName);
}

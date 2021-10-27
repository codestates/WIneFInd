package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Model.QWine;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.querydsl.jpa.impl.JPAQuery;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class WineRepositoryCustomImpl implements WineRepositoryCustom{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Wine> findByWineName(String winename, String type) {
        QWine qWine = QWine.wine;
        JPAQuery<?> query = new JPAQuery<Void>(em);
        for(QWine i : qWine){

        }
        List<Wine> wines = query.select(qWine)
                .from(qWine)
                .where(qWine.wineName.contains(winename))
                .where(qWine.type.contains(type))
                .fetch();
        return wines;
    }
}

package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.QWine;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.BooleanOperation;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static Apoint.WIneFInd.Wine.Model.QWine.*;

public class WineRepositoryCustomImpl implements WineRepositoryCustom {

    @Autowired
    JPAQueryFactory queryFactory;

    // Q와인을 전역으로 관리


    /* winename 이랑 type 가 둘어왔을때 둘의 AND 연산은 가능 원본데이터 빼놓기
    @Override
    public List<Wine> findByWineName(String winename, String type) {
        QWine qWine = QWine.wine;
        JPAQuery<?> query = new JPAQuery<Void>(em);
        List<Wine> wines = query.select(qWine)
                .from(qWine)
                .where(qWine.wineName.contains(winename),qWine.type.contains(type))
                .fetch();
        return wines;
    }
    */

    // wineFilterDTO 의 List Filtering 처리 ... 생각 정리해보자
    // 1. wineFilterDTO 의 getTypesList()로 White, Rose 가 들어올 경우 White 와 Rose 값 모두 찾기
    // 2. 여기서 추가로 GetCountriesList() 로 Korea, France 가 들어온다고 했을경우 똑같이 Korea, France 찾고
    // 위에서 얻은 값에서 서로 AND 연산 ...
    @Override
    public List<Wine> FindByWineFiltering(WineFilterDTO wineFilterDTO) {

        List<Wine> result = queryFactory.selectFrom(wine)
                .where(whereClause(wineFilterDTO))
//                .where(wine.type.contains("wh").or(wine.type.contains("re")).or(wine.type.eq("Final")))
//                .where(wine.country.contains("ko").or(wine.country.contains("pt")))
                .fetch();

        return result;

    }

//    private BooleanExpression typeEq(List<String> types) {
//
//        if (!types.isEmpty()) {
//            for (String type : types) {
//                wine.type.contains(type);
//            }
//        }
//
//        return null;
//    }

    private Predicate whereClause(WineFilterDTO wineFilterDTO) { // (3)
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if(!wineFilterDTO.getTypesList().isEmpty()){
            for(String type: wineFilterDTO.getTypesList()){
                booleanBuilder.or(wine.type.contains(type));
            }
        }
        if(!wineFilterDTO.getCountriesList().isEmpty()){
            for(String country: wineFilterDTO.getCountriesList()) {
                booleanBuilder.or(wine.type.contains(country));
            }
        }
        return booleanBuilder;
    }
}

/*


        Optional.ofNullable(queryParam.getName())
                .ifPresent(name -> booleanBuilder.and(player.name.eq(name)));
        Optional.ofNullable(queryParam.getAge())
                .ifPresent(age -> booleanBuilder.and(player.age.lt(age)));*/

//    private BooleanExpression typeEq(String type) {
//        return type != null ? qWine.country.contains(type) : null;
//    }
//}



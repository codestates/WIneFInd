package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.QWine;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static Apoint.WIneFInd.Wine.Model.QWine.wine;

public class WineRepositoryCustomImpl implements WineRepositoryCustom {

    @Autowired
    JPAQueryFactory queryFactory;


    // 1. wineFilterDTO 의 getTypesList()로 White, Rose 가 들어올 경우 White 와 Rose 값 모두 찾기
    // 2. 여기서 추가로 wineFilterDTO 의 getCountriesList() 로 Korea, France 가 들어온다고 했을경우 똑같이 Korea, France 찾고
    // 각각 위에서 얻은 값으로 서로 AND 연산 ...
    @Override
    public List<Wine> FindByWineFiltering(WineFilterDTO wineFilterDTO) {

        // FindByWineFiltering 까지 들어왔는지 확인
        System.out.println("FindByWineFiltering() Wine -> Repo -> WineRepoImpl p28");

        // 각 타입별로 or 채크 후 where 로 and 연산
        List<Wine> result = queryFactory.selectFrom(QWine.wine)
                .where(whereType(wineFilterDTO))
                .where(whereCountry(wineFilterDTO))
                .where(whereSweet(wineFilterDTO))
                .where(whereAcidity(wineFilterDTO))
                .where(whereBody(wineFilterDTO))
                .where(wherePrice(wineFilterDTO))
                .fetch();

        return result;

    }

    // where 부분이 List 로 들어왔을경우 List안의 내용을 모두 수행하기 위해서
    // for문을 사용하여 or 절로 묶어서 연결
    private Predicate whereType(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getTypesList().isEmpty()) {
            for (String type : wineFilterDTO.getTypesList()) {
                booleanBuilder.or(wine.type.contains(type));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereCountry(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getCountriesList().isEmpty()) {
            for (String country : wineFilterDTO.getCountriesList()) {
                booleanBuilder.or(wine.country.contains(country));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereSweet(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getSweetnessList().isEmpty()) {
            for (String sweet : wineFilterDTO.getSweetnessList()) {
                booleanBuilder.or(wine.sweet.contains(sweet));
            }
        }
        return booleanBuilder;
    }
    private Predicate whereAcidity(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getAcidityList().isEmpty()) {
            for (String acidity : wineFilterDTO.getAcidityList()) {
                booleanBuilder.or(wine.acidity.contains(acidity));
            }
        }
        return booleanBuilder;
    }
    private Predicate whereBody(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getBodyList().isEmpty()) {
            for (String body : wineFilterDTO.getBodyList()) {
                booleanBuilder.or(wine.body.contains(body));
            }
        }
        return booleanBuilder;
    }

    private Predicate wherePrice(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getPriceList().isEmpty()) {
            for (String price : wineFilterDTO.getPriceList()) {
                booleanBuilder.or(wine.price.contains(price));
            }
        }
        return booleanBuilder;
    }



}





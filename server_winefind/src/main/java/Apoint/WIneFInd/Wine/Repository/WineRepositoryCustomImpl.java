package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Model.QWine;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

public class WineRepositoryCustomImpl implements WineRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    //    @Autowired
//    private WineRepository wineRepository;

    QWine qWine = QWine.wine;

   /* @Override
    public List<Wine> findByWineName(String winename, String type) {
        QWine qWine = QWine.wine;
        JPAQuery<?> query = new JPAQuery<Void>(em);
        List<Wine> wines = query.select(qWine)
                .from(qWine)
                .where(qWine.wineName.contains(winename),qWine.type.contains(type))
                .fetch();
        return wines;
    }*/


//    @Override
//    public List<Wine> findByWineFilter(List<String> typesList, List<String> countriesList, List<String> sweetnessList,
//                                       List<String> acidityList, List<String> bodyList, List<String> priceList) {


    @Override
    public List<Wine> findByWineFilter(List<String> typesList, List<String> countriesList, List<String> sweetnessList) {

        JPAQuery<?> query = new JPAQuery<Void>(em);


        List<Long> longTypeList = new ArrayList();
        for (String type : typesList) {
            List<Wine> wines = query.select(qWine)
                    .from(qWine)
                    .where(typeEq(type))
                    .fetch();

            for (Wine i : wines) {
                System.out.println("type 들어왔니? : " + i.getId());
                longTypeList.add(i.getId());

            }
//            wines = null;
        }

        List<Long> longCountriesList = new ArrayList();
        for (String countries : countriesList) {
            List<Wine> winesA = query.select(qWine)
                    .from(qWine)
                    .where(countriesEq(countries))
                    .fetch();

            for (Wine i : winesA) {
                longCountriesList.add(i.getId());
            }
        }
//
        List<Long> longSweetnessList = new ArrayList();
        for (String sweetness : sweetnessList) {
            List<Wine> winesA = query.select(qWine)
                    .from(qWine)
                    .where(sweetnessEq(sweetness))
                    .fetch();

            for (Wine i : winesA) {
                longSweetnessList.add(i.getId());
            }
        }
//
//        List<Long> longAcidityList = new ArrayList();
//        for (String acidity : acidityList) {
//            List<Wine> wines = query.select(qWine)
//                    .from(qWine)
//                    .where(acidityEq(acidity))
//                    .fetch();
//
//            for (Wine i : wines) {
//                longAcidityList.add(i.getId());
//            }
//        }
//
//        List<Long> longBodyList = new ArrayList();
//        for (String body : bodyList) {
//            List<Wine> wines = query.select(qWine)
//                    .from(qWine)
//                    .where(bodyEq(body))
//                    .fetch();
//
//            for (Wine i : wines) {
//                longBodyList.add(i.getId());
//            }
//        }
//
//        List<Long> longPriceList = new ArrayList();
//        for (String price : priceList) {
//            List<Wine> wines = query.select(qWine)
//                    .from(qWine)
//                    .where(priceEq(price))
//                    .fetch();
//
//            for (Wine i : wines) {
//                longPriceList.add(i.getId());
//            }
//        }
        System.out.println("첫번째 파라미터 typesList : " + typesList);
        System.out.println("두번째 파라미터 countriesList : " + countriesList);
        System.out.println("세번째 파라미터 sweetnessList : " + sweetnessList);

        System.out.println("첫번째 리스트" + longTypeList);
        System.out.println("두번쨰 리스트" + longCountriesList);
        System.out.println("세번쨰 리스트" + longSweetnessList);

        if (longCountriesList.size() != 0) {
            longTypeList.retainAll(longCountriesList);
        } else if (longSweetnessList.size() != 0) {
            longTypeList.retainAll(longSweetnessList);
        }

//          longTypeList.retainAll(longAcidityList);
//          longTypeList.retainAll(longBodyList);
//          longTypeList.retainAll(longPriceList);

        System.out.println("최종 리스트" + longTypeList);

//        if (longTypeList != null) {
//            return findById(longTypeList);
//        }
        return findById(longTypeList);
    }

    @Override
    public List<Wine> findById(List<Long> id) {
        List<Wine> list = new ArrayList<>();
        for (Long i : id) {
            List<Wine> resultList = em.createQuery("SELECT w from Wine w where w.id ='" + i + "' ", Wine.class)
                    .getResultList();
            list.add(resultList.get(0));
            em.close();
        }
        return list;
    }

    /*private BooleanExpression typeEq(List<String> type) {
        System.out.println("type가 뭐가 들어오니?" + type);
        if (type.size() >= 1) {
            String [] name = new String[3];
            for (String next : type) {
//            for( i = 0; i <= type.size(); i++){
                System.out.println("next 너는 뭔대? : "+ next);
                if (first == null) {
                    first = next;
                } else if(sec == null){
                    sec = next;
                }
                System.out.println("first 는 뭐니? : " + first);
                System.out.println("sec 은 뭐니? : " + sec);
                return qWine.type.contains(first).or(qWine.type.contains(sec));
            }
        }
        return type != null ? qWine.country.contains(type.get(0)) : null;
    }*/
    private BooleanExpression typeEq(String type) {
        return type != null ? qWine.country.contains(type) : null;
    }

    private BooleanExpression countriesEq(String countries) {
        return countries != null ? qWine.country.contains(countries) : null;
    }

    private BooleanExpression sweetnessEq(String sweetness) {
        return sweetness != null ? qWine.sweet.contains(sweetness) : null;
    }

    private BooleanExpression acidityEq(String acidity) {
        return acidity != null ? qWine.type.eq(acidity) : null;
    }

    private BooleanExpression bodyEq(String body) {
        return body != null ? qWine.type.eq(body) : null;
    }

    private BooleanExpression priceEq(String price) {
        return price != null ? qWine.type.eq(price) : null;
    }
}

 /*  List<Long> test = new ArrayList();
        for (Wine wine : wines) {
            test.add(wine.getId());
        }
        System.out.println(test);
        return wines;
    }*/

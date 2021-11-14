package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static Apoint.WIneFInd.Article.Model.QArticle.article;

public class ArticleRepositoryCustomImpl implements ArticleRepositoryCustom {

    @Autowired
    JPAQueryFactory queryFactory;

    // 타이핑으로 판매 글들을 찾기
    @Override
    public PageImpl<Article> FindByTotalSearch(String text, Pageable pageable) {

        // client 요청에 맞춰서 필요한 부분 검색 기능
        List<Article> articleSearch = queryFactory.selectFrom(article)
                .where(article.title.contains(text)
                        .or(article.content.contains(text))
                        .or(article.wine.wineName.contains(text))
                        .or(article.wine.country.contains(text))
                        .or(article.wine.type.contains(text))
                        .or(article.wine.content.contains(text)))
                .orderBy(article.wine.id.desc())
                .fetch();

        // 페이지 네이션의 시작값과 끝값 정의하기
        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > articleSearch.size() ? articleSearch.size() : (start + pageable.getPageSize());

        return new PageImpl<>(articleSearch.subList(start, end), pageable, articleSearch.size());
    }


    // 카테고리 버튼으로 필터처리
    @Override
    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable) {

        // articleFilterDTO 의 데이터들이 List로 들어오기 때문에 for문을 사용하기 위해서
        // where 절 안을 메소드로 선언
        List<Article> articleFilter = queryFactory.selectFrom(article)
                .where(whereList(articleFilterDTO.getTypesList(), article.wine.type))
                .where(whereList(articleFilterDTO.getCountriesList(), article.wine.country))
                .where(whereList(articleFilterDTO.getSweetnessList(), article.wine.sweet))
                .where(whereList(articleFilterDTO.getAcidityList(), article.wine.acidity))
                .where(whereList(articleFilterDTO.getBodyList(), article.wine.body))
                .where(whereList(articleFilterDTO.getTannicList(), article.wine.tannic))
                .where(whereList(articleFilterDTO.getPriceList(), article.wine.price))
                .orderBy(article.wine.id.desc())
                .fetch();

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > articleFilter.size() ? articleFilter.size() : (start + pageable.getPageSize());

        return new PageImpl<>(articleFilter.subList(start, end), pageable, articleFilter.size());
    }


    // 와인 추천에 사용되는 알고리즘
    @Override
    public List<Article> FindByRecommendedWineAlgo(ArticleAlgorithmDTO articleAlgorithmDTO) {

        List<Article> articleAlgo = queryFactory.selectFrom(article)
                .where(articleAlgoBody(articleAlgorithmDTO))
                .where(articleAlgoSweet(articleAlgorithmDTO))
                .where(articleAlgoTannic(articleAlgorithmDTO))
                .where(articleAlgoAcidity(articleAlgorithmDTO))
                .where(articleAlgoGrape(articleAlgorithmDTO))
                .where(articleAlgoText(articleAlgorithmDTO))
                .fetch();

        return articleAlgo;

    }


    private Predicate articleAlgoBody(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        // getBody 가 1일 경우 wine의 body 가 3이상인 와인찾기
        // getBody 가 1이 아닐경우 wine의 body 가 2이하인 와인찾기
        if (articleAlgorithmDTO.getBody().equals("1")) {
            booleanBuilder.or(article.wine.body.goe("3"));
        } else {
            booleanBuilder.or(article.wine.body.loe("2"));
        }
        return booleanBuilder;
    }

    private Predicate articleAlgoSweet(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (articleAlgorithmDTO.getSweet().equals("1")) {
            booleanBuilder.or(article.wine.sweet.goe("3"));
        } else {
            booleanBuilder.or(article.wine.sweet.loe("2"));
        }

        return booleanBuilder;
    }

    private Predicate articleAlgoTannic(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (articleAlgorithmDTO.getTannic().equals("4") || articleAlgorithmDTO.getTannic().equals("5")) {
            booleanBuilder.or(article.wine.tannic.goe("3"));
        } else {
            booleanBuilder.or(article.wine.tannic.loe("2"));
        }

        return booleanBuilder;
    }

    private Predicate articleAlgoAcidity(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (articleAlgorithmDTO.getAcidity().equals("4") || articleAlgorithmDTO.getAcidity().equals("5")) {
            booleanBuilder.or(article.wine.acidity.goe("3"));
        } else {
            booleanBuilder.or(article.wine.acidity.loe("2"));
        }

        return booleanBuilder;
    }

    private Predicate articleAlgoGrape(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (!articleAlgorithmDTO.getGrape().equals("1")) {

            // 대중적이지 않은 와인 getGrape 의 값이 1이 아닐경우
            // 아래 String과 일치하지 않는 모든 와인
            booleanBuilder
                    .and(article.wine.grape.notLike("Cabernet Sauvignon"))
                    .and(article.wine.grape.notLike("Merlot"))
                    .and(article.wine.grape.notLike("pinot noir"))
                    .and(article.wine.grape.notLike("Sangiovese"))
                    .and(article.wine.grape.notLike("Chardonnay"))
                    .and(article.wine.grape.notLike("Sauvignon Blanc"));
        } else {
            // 대중적인 와인 getGrape 의 값이 1일 경우
            booleanBuilder
                    .or(article.wine.grape.contains("Cabernet Sauvignon"))
                    .or(article.wine.grape.contains("Merlot"))
                    .or(article.wine.grape.contains("pinot noir"))
                    .or(article.wine.grape.contains("Sangiovese"))
                    .or(article.wine.grape.contains("Chardonnay"))
                    .or(article.wine.grape.contains("Sauvignon Blanc"));
        }


        return booleanBuilder;
    }

    private Predicate articleAlgoText(ArticleAlgorithmDTO articleAlgorithmDTO) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (!articleAlgorithmDTO.getTaste().isEmpty()) {
            booleanBuilder.or(article.wine.content.contains(articleAlgorithmDTO.getTaste()));
        }
        if (!articleAlgorithmDTO.getAroma().isEmpty()) {
            booleanBuilder.or(article.wine.content.contains(articleAlgorithmDTO.getAroma()));
        }

        return booleanBuilder;
    }


    public Predicate whereList(List<String> list, StringPath query) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        // 입력받은 List가 비어있지 않다면 List의 size만큼 where절 생성
        if (!list.isEmpty()) {
            for (String i : list) {
                booleanBuilder.or(query.contains(i));
            }
        }
        // 비어있다면 Null 리턴
        return booleanBuilder;
    }

//    private Predicate whereType(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getTypesList().isEmpty()) {
//            for (String type : articleFilterDTO.getTypesList()) {
//                booleanBuilder.or(article.wine.type.contains(type));
//            }
//        }
//
//        return booleanBuilder;
//    }
//
//    private Predicate whereCountry(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getCountriesList().isEmpty()) {
//            for (String country : articleFilterDTO.getCountriesList()) {
//                booleanBuilder.or(article.wine.country.contains(country));
//            }
//        }
//
//        return booleanBuilder;
//    }
//
//    private Predicate whereSweet(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getSweetnessList().isEmpty()) {
//            for (String sweet : articleFilterDTO.getSweetnessList()) {
//                booleanBuilder.or(article.wine.sweet.contains(sweet));
//            }
//        }
//
//        return booleanBuilder;
//    }
//
//    private Predicate whereAcidity(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getAcidityList().isEmpty()) {
//            for (String acidity : articleFilterDTO.getAcidityList()) {
//                booleanBuilder.or(article.wine.acidity.contains(acidity));
//            }
//        }
//
//        return booleanBuilder;
//    }
//
//    private Predicate whereBody(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getBodyList().isEmpty()) {
//            for (String body : articleFilterDTO.getBodyList()) {
//                booleanBuilder.or(article.wine.body.contains(body));
//            }
//        }
//
//        return booleanBuilder;
//    }
//
//    private Predicate whereTannic(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getTannicList().isEmpty()) {
//            for (String tannic : articleFilterDTO.getTannicList()) {
//                booleanBuilder.or(article.wine.tannic.contains(tannic));
//            }
//
//        }
//        return booleanBuilder;
//    }
//
//    private Predicate wherePrice(ArticleFilterDTO articleFilterDTO) {
//
//        BooleanBuilder booleanBuilder = new BooleanBuilder();
//
//        if (!articleFilterDTO.getPriceList().isEmpty()) {
//            for (String price : articleFilterDTO.getPriceList()) {
//                booleanBuilder.or(article.wine.price.goe(price));
//            }
//
//        }
//        return booleanBuilder;
//    }


}

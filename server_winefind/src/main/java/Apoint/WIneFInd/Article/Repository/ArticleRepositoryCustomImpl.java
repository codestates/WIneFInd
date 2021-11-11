package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
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


    @Override
    public PageImpl<Article> FindByTotalSearch(String text, Pageable pageable) {


        List<Article> articleSearch = queryFactory.selectFrom(article)
                .where(article.title.contains(text)
                        .or(article.content.contains(text))
                        .or(article.wine.wineName.contains(text))
                        .or(article.wine.country.contains(text))
                        .or(article.wine.type.contains(text)))
                .orderBy(article.wine.id.desc())
                .fetch();

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > articleSearch.size() ? articleSearch.size() : (start + pageable.getPageSize());

        return new PageImpl<>(articleSearch.subList(start, end), pageable, articleSearch.size());
    }


    // 카테고리 필터
    @Override
    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable) {

        List<Article> articleFilter = queryFactory.selectFrom(article)
                .where(whereType(articleFilterDTO))
                .where(whereCountry(articleFilterDTO))
                .where(whereSweet(articleFilterDTO))
                .where(whereAcidity(articleFilterDTO))
                .where(whereBody(articleFilterDTO))
                .where(whereTannic(articleFilterDTO))
                .where(wherePrice(articleFilterDTO))
                .orderBy(article.wine.id.desc())
                .fetch();

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > articleFilter.size() ? articleFilter.size() : (start + pageable.getPageSize());

        return new PageImpl<>(articleFilter.subList(start, end), pageable, articleFilter.size());
    }

    @Override
    public List<Article> RecommendedArticle(ArticleAlgorithmDTO articleAlgorithmDTO) {

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
        System.out.println("1articleAlgoBody :");
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (articleAlgorithmDTO.getBody().equals("1")) {
            booleanBuilder.or(article.wine.body.goe("3"));
        } else {
            booleanBuilder.or(article.wine.body.loe("2"));
        }
        System.out.println("2articleAlgoBody :");
        return booleanBuilder;
    }

    private Predicate articleAlgoSweet(ArticleAlgorithmDTO articleAlgorithmDTO) {
        System.out.println("1articleAlgoSweet :");
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (articleAlgorithmDTO.getSweet().equals("1")) {
            booleanBuilder.or(article.wine.sweet.goe("3"));
        } else {
            booleanBuilder.or(article.wine.sweet.loe("2"));
        }
        System.out.println("2articleAlgoSweet :");
        return booleanBuilder;
    }

    private Predicate articleAlgoTannic(ArticleAlgorithmDTO articleAlgorithmDTO) {
        System.out.println("1articleAlgoTannic :");
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (articleAlgorithmDTO.getTannic().equals("4") || articleAlgorithmDTO.getTannic().equals("5")) {
            booleanBuilder.or(article.wine.tannic.goe("3"));
        } else {
            booleanBuilder.or(article.wine.tannic.loe("2"));
        }
        System.out.println("2articleAlgoTannic :");

        return booleanBuilder;
    }

    private Predicate articleAlgoAcidity(ArticleAlgorithmDTO articleAlgorithmDTO) {
        System.out.println("1articleAlgoAcidity :");

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (articleAlgorithmDTO.getAcidity().equals("4") || articleAlgorithmDTO.getAcidity().equals("5")) {
            booleanBuilder.or(article.wine.acidity.goe("3"));
        } else {
            booleanBuilder.or(article.wine.acidity.loe("2"));
        }
        System.out.println("2articleAlgoAcidity :");

        return booleanBuilder;
    }

    private Predicate articleAlgoGrape(ArticleAlgorithmDTO articleAlgorithmDTO) {
        System.out.println("1articleAlgoGrape :");

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (articleAlgorithmDTO.getGrape().equals("1")) {
            booleanBuilder
                    .or(article.wine.grape.notLike("Carbenet Sauvignon"))
                    .or(article.wine.grape.notLike("Merlot"))
                    .or(article.wine.grape.notLike("pinot noir"))
                    .or(article.wine.grape.notLike("Sangiovese"))
                    .or(article.wine.grape.notLike("Chardonnay"))
                    .or(article.wine.grape.notLike("Sauvignon Blanc"));
        } else {
            booleanBuilder
                    .or(article.wine.grape.contains("Carbenet Sauvignon"))
                    .or(article.wine.grape.contains("Merlot"))
                    .or(article.wine.grape.contains("pinot noir"))
                    .or(article.wine.grape.contains("Sangiovese"))
                    .or(article.wine.grape.contains("Chardonnay"))
                    .or(article.wine.grape.contains("Sauvignon Blanc"));
        }
        System.out.println("1articleAlgoGrape :");

        return booleanBuilder;
    }

    private Predicate articleAlgoText(ArticleAlgorithmDTO articleAlgorithmDTO) {
        System.out.println("1articleAlgoAcidity :");

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleAlgorithmDTO.getTaste().isEmpty()) {
            booleanBuilder.or(article.wine.content.contains(articleAlgorithmDTO.getTaste()));
        }
        if(!articleAlgorithmDTO.getAroma().isEmpty()){
            booleanBuilder.or(article.wine.content.contains(articleAlgorithmDTO.getAroma()));
        }
        System.out.println("2articleAlgoAcidity :");

        return booleanBuilder;
    }


    private Predicate whereType(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getTypesList().isEmpty()) {
            for (String type : articleFilterDTO.getTypesList()) {
                booleanBuilder.or(article.wine.type.contains(type));
            }
        }
        return booleanBuilder;
    }


    private Predicate whereCountry(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getCountriesList().isEmpty()) {
            for (String country : articleFilterDTO.getCountriesList()) {
                booleanBuilder.or(article.wine.country.contains(country));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereSweet(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getSweetnessList().isEmpty()) {
            for (String sweet : articleFilterDTO.getSweetnessList()) {
                booleanBuilder.or(article.wine.sweet.contains(sweet));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereAcidity(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getAcidityList().isEmpty()) {
            for (String acidity : articleFilterDTO.getAcidityList()) {
                booleanBuilder.or(article.wine.acidity.contains(acidity));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereBody(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getBodyList().isEmpty()) {
            for (String body : articleFilterDTO.getBodyList()) {
                booleanBuilder.or(article.wine.body.contains(body));
            }
        }
        return booleanBuilder;
    }

    private Predicate whereTannic(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getTannicList().isEmpty()) {
            for (String tannic : articleFilterDTO.getTannicList()) {
                booleanBuilder.or(article.wine.tannic.contains(tannic));
            }
        }
        return booleanBuilder;
    }

    private Predicate wherePrice(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getPriceList().isEmpty()) {
            for (String price : articleFilterDTO.getPriceList()) {
                booleanBuilder.or(article.wine.price.goe(price));
            }
        }
        return booleanBuilder;
    }


}

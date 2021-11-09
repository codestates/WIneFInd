package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
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
    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable){
        System.out.println(articleFilterDTO.getCountriesList());

        List<Article> result = queryFactory.selectFrom(article)
                .where(whereType(articleFilterDTO))
                .where(whereCountry(articleFilterDTO))
                .where(whereSweet(articleFilterDTO))
                .where(whereAcidity(articleFilterDTO))
                .where(whereBody(articleFilterDTO))
                .where(wherePrice(articleFilterDTO))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > result.size() ? result.size() : (start + pageable.getPageSize());

        return new PageImpl<>(result.subList(start,end),pageable, result.size());
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

    private Predicate wherePrice(ArticleFilterDTO articleFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!articleFilterDTO.getPriceList().isEmpty()) {
            for (String price : articleFilterDTO.getPriceList()) {
                booleanBuilder.or(article.wine.price.contains(price));
            }
        }
        return booleanBuilder;
    }


}
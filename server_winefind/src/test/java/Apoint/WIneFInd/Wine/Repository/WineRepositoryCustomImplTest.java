package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.QWine;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static Apoint.WIneFInd.Wine.Model.QWine.*;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
//@Transactional
class WineRepositoryCustomImplTest {

    @Autowired
    WineRepository wineRepository;

    @Autowired
    JPAQueryFactory queryFactory;

    @Test
    public void setData() {
        Wine wine1 = Wine.builder().wineName("와인네임1").type("와인타입1").country("와인국가1").grape("와인품종1").vintage("1991")
                .sweet("엄청달아").acidity("엄청셔").body("엄청뚱뚱해").tannic("엄청...?").image("와인사진1").content("와인내용1")
                .price("와인가격1").build();

        Wine wine2 = Wine.builder().wineName("와인네임2").type("와인타입2").country("와인국가2").grape("와인품종2").vintage("1992")
                .sweet("엄청달아").acidity("엄청셔").body("엄청뚱뚱해").tannic("엄청...?").image("와인사진2").content("와인내용2")
                .price("와인가격").build();

        Wine wine3 = Wine.builder().wineName("와인네임3").type("와인타입3").country("와인국가3").grape("와인품종3").vintage("1994")
                .sweet("엄청달아").acidity("엄청셔").body("엄청뚱뚱해").tannic("엄청...?").image("와인사진3").content("와인내용3")
                .price("와인가격").build();

        wineRepository.saveAll(List.of(wine1, wine2, wine3));
    }

    @Test
    public void QueryTest() {
        List<Wine> listQuery = queryFactory.selectFrom(wine)
                .fetch();

        assertThat(listQuery.size()).isEqualTo(13);
    }

    @Test
    public void QueryTest2() {
        List<Wine> listQuery = queryFactory.selectFrom(wine)
                .where(wine.type.eq("와인타입1"),
                        wine.sweet.contains("달아"))
                .fetch();

        assertThat(listQuery.size()).isEqualTo(1);
    }

    @Test
    @DisplayName("String List형태로 잘 들어오니?")
    public void 동적쿼리(WineFilterDTO wineFilterDTO) {
    // 음... List 형태 값 어캐 넣ㅈ.. ㅁㄴㅇㄹ

        List<Wine> wines = queryFactory.selectFrom(wine)
                .where(whereType(wineFilterDTO))
                .fetch();

//        assertThat()
    }

    private Predicate whereType(WineFilterDTO wineFilterDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (!wineFilterDTO.getTypesList().isEmpty()) {
            for (String type : wineFilterDTO.getTypesList()) {
                booleanBuilder.or(wine.type.contains(type));
            }
        }
        return booleanBuilder;
    }
}
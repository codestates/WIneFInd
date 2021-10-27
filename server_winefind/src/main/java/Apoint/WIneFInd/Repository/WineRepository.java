package Apoint.WIneFInd.Repository;


import Apoint.WIneFInd.Domain.WineDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Model.Wines;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Repository
public class WineRepository {

    private final EntityManager entityManager;

    public WineRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void Create(WineDTO wineDTO) {

        Wines wine = new Wines();

        wine.setWineName(wineDTO.getWineName());
        wine.setType(wineDTO.getType());
        wine.setCountry(wineDTO.getCountry());
        wine.setGrape(wineDTO.getGrape());
        wine.setVintage(wineDTO.getVintage());
        wine.setSweet(wineDTO.getSweet());
        wine.setAcidity(wineDTO.getAcidity());
        wine.setBody(wineDTO.getBody());
        wine.setTannic(wineDTO.getTannic());
        wine.setImage(wineDTO.getImage());
        wine.setComment(wineDTO.getComment());
        wine.setPrice(wineDTO.getPrice());

        entityManager.persist(wine);
        entityManager.flush();
        entityManager.close();

    }

    //    Wines 전체 목록 조회
    public List<Wines> findAll() {

        return entityManager.createQuery("SELECT w FROM Wines w", Wines.class).getResultList();
    }

    //    유저 아이디 선택해서 찾기
    public Wines findById(long id) {
        List<Wines> list = entityManager
                .createQuery("SELECT w FROM Wines w WHERE w.id='" + id + "'", Wines.class)
                .getResultList();
        entityManager.close();
        return list.get(0);
    }

    public List<Wines> findByWines(String wineName, String type, String country, String grape, String vintage, String sweet,
                                    String acidity, String body, String tannic, String image, String comment, String price) {

        List<Wines> winesList = findAll();
        return winesList.stream()
                .filter(item -> item.equals(wineName))
                .filter(item -> item.equals(type))
                .filter(item -> item.equals(country))
                .filter(item -> item.equals(grape))
                .filter(item -> item.equals(vintage))
                .filter(item -> item.equals(sweet))
                .filter(item -> item.equals(acidity))
                .filter(item -> item.equals(body))
                .filter(item -> item.equals(tannic))
                .filter(item -> item.equals(image))
                .filter(item -> item.equals(comment))
                .filter(item -> item.equals(price))
                .collect(Collectors.toList());
    }


    public List<Wines> findByWinename(String wineName) {
        // DB service_user 테이블에 매개변수 email과 일치하는 유저 정보를 리턴합니다.
        return entityManager.createQuery("SELECT w FROM Wines w WHERE w.wineName = '" + wineName + "'", Wines.class).getResultList();
    }

    //    유저 아이디를 이용하여 업데이트
    public void Update(Wines wine) {

        Wines updateWines = findById(wine.getId());

        updateWines.setWineName(wine.getWineName());
        updateWines.setType(wine.getType());
        updateWines.setCountry(wine.getCountry());
        updateWines.setGrape(wine.getGrape());
        updateWines.setVintage(wine.getVintage());
        updateWines.setSweet(wine.getSweet());
        updateWines.setAcidity(wine.getAcidity());
        updateWines.setBody(wine.getBody());
        updateWines.setTannic(wine.getTannic());
        updateWines.setImage(wine.getImage());
        updateWines.setComment(wine.getComment());
        updateWines.setPrice(wine.getPrice());

        entityManager.persist(updateWines);
        entityManager.flush();
        entityManager.close();

    }

    //    유저 아이디를 이용하여 삭제
    public void Delete(long id) {
        Wines deleteWine = findById(id);
        entityManager.remove(deleteWine);
        entityManager.close();
    }
}

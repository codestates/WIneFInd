//package Apoint.WIneFInd.Service;
//
//import Apoint.WIneFInd.Domain.WineDTO;
//import Apoint.WIneFInd.Model.Wines;
//import Apoint.WIneFInd.Repository.WineRepository;
//import org.springframework.stereotype.Service;
//
//import javax.persistence.EntityManager;
//import javax.transaction.Transactional;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@Transactional
//public class WineService {
//
//    private final WineRepository wineRepository;
//
//    private final EntityManager em;
//
//    public WineService(WineRepository wineRepository, EntityManager em) {
//        this.wineRepository = wineRepository;
//        this.em = em;
//    }
////
////    public Wines CreateArticle(Wines wines) {
////        for (Wines i : wineRepository.findAll()) {
////            if (i.getWineName().equals(wines.getWineName())) {
////                return null;
////            }
////        }
////
////        wineRepository.save(wines);
////        return wineRepository.findByWinename(wines.getWineName()).get();
////    }
//
//    public List<Wines> FindByAll() {
//        return wineRepository.findAll();
//    }
//
//    public Optional<Wines> FindById(long id) {
//        return wineRepository.findById(id);
//    }
//
////    public Optional<Wines> FindByWinename(String winename) {
////        return wineRepository.findByWinename(winename);
////    }
//
//
//    public void UpdateWine(Wines wines) {
//        Wines updateWines = wineRepository.findById(wines.getId()).get();
//
//        updateWines.setWineName(wines.getWineName());
//        updateWines.setType(wines.getType());
//        updateWines.setCountry(wines.getCountry());
//        updateWines.setGrape(wines.getGrape());
//        updateWines.setVintage(wines.getVintage());
//        updateWines.setSweet(wines.getSweet());
//        updateWines.setAcidity(wines.getAcidity());
//        updateWines.setBody(wines.getBody());
//        updateWines.setTannic(wines.getTannic());
//        updateWines.setImage(wines.getImage());
//        updateWines.setComment(wines.getComment());
//        updateWines.setPrice(wines.getPrice());
//
//        em.persist(updateWines);
//        em.flush();
//        em.close();
//
//
//    }
//
//    public void DeleteWine(long id) {
//        wineRepository.deleteById(id);
//    }
//}

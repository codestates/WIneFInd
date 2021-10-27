package Apoint.WIneFInd.Service;

import Apoint.WIneFInd.Domain.WineDTO;
import Apoint.WIneFInd.Model.Wines;
import Apoint.WIneFInd.Repository.WineRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class WineService {

    private final WineRepository wineRepository;

    public WineService(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    public Wines CreateArticle(WineDTO wineDTO) {
        for (Wines i : wineRepository.findAll()) {
            if (i.getWineName().equals(wineDTO.getWineName())) {
                return null;
            }
        }
        wineRepository.Create(wineDTO);
        return wineRepository.findByWinename(wineDTO.getWineName()).get(0);
    }

    public List<Wines> FindByWines(String wineName, String type, String country, String grape, String vintage, String sweet,
                                   String acidity, String body, String tannic, String image, String comment, String price) {
        return wineRepository.findByWines(wineName, type, country, grape, vintage, sweet,
                acidity, body, tannic, image, comment, price);
    }

    public List<Wines> FindByAll() {
        return wineRepository.findAll();
    }

    public Wines FindById(long id) {
        return wineRepository.findById(id);
    }

    public void UpdateWine(Wines wines) {
        wineRepository.Update(wines);
    }

    public void DeleteWine(long id) {
        wineRepository.Delete(id);
    }
}

package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WineServiceImpl implements WineService {

    private final WineRepository wineRepository;

    @Autowired
    public WineServiceImpl(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    @Override
    public Wine Save(Wine wine) {

        return wineRepository.save(wine);
    }

    @Override
    public List<Wine> FindByAll() {

        return wineRepository.findAll();
    }

    @Override
    public Optional<Wine> FindById(Long id) {

        return wineRepository.findById(id);
    }

    @Override
    public Wine Update(Wine wine) {

        Wine updateWine = wineRepository.findById(wine.getId()).get();

        updateWine.setWineName(wine.getWineName());
        updateWine.setType(wine.getType());
        updateWine.setCountry(wine.getCountry());
        updateWine.setGrape(wine.getGrape());
        updateWine.setVintage(wine.getVintage());
        updateWine.setSweet(wine.getSweet());
        updateWine.setAcidity(wine.getAcidity());
        updateWine.setBody(wine.getBody());
        updateWine.setTannic(wine.getTannic());
        updateWine.setImage(wine.getImage());
        updateWine.setComment(wine.getComment());
        updateWine.setPrice(wine.getPrice());

        return wineRepository.save(updateWine);
    }


    @Override
    public List<Wine> Delete(Long id) {

        wineRepository.deleteById(id);

        return wineRepository.findAll();
    }
}

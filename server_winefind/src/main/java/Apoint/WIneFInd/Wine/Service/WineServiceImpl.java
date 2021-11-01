package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
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
    public Wine Save(WineDTO wineDTO) {

        Wine createWine = new Wine();
        createWine = createWine.builder()
                .wineName(wineDTO.getWineName())
                .type(wineDTO.getType())
                .country(wineDTO.getCountry())
                .grape(wineDTO.getGrape())
                .vintage(wineDTO.getVintage())
                .sweet(wineDTO.getSweet())
                .acidity(wineDTO.getAcidity())
                .body(wineDTO.getBody())
                .tannic(wineDTO.getTannic())
                .image(wineDTO.getImage())
                .comment(wineDTO.getComment())
                .price(wineDTO.getPrice())
                .build();

        return wineRepository.save(createWine);
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

        updateWine = updateWine.builder()
                .wineName(wine.getWineName())
                .type(wine.getType())
                .country(wine.getCountry())
                .grape(wine.getGrape())
                .vintage(wine.getVintage())
                .sweet(wine.getSweet())
                .acidity(wine.getAcidity())
                .body(wine.getBody())
                .tannic(wine.getTannic())
                .image(wine.getImage())
                .comment(wine.getComment())
                .price(wine.getPrice())
                .build();

        return wineRepository.save(updateWine);
    }


    @Override
    public List<Wine> Delete(Long id) {

        wineRepository.deleteById(id);

        return wineRepository.findAll();
    }
}

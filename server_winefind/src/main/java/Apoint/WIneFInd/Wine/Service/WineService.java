package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;
import java.util.Optional;

public interface WineService {

    public Wine Save(WineDTO wineDTO);

    public List<Wine> FindByAll();

    public Wine FindById(Long id);

    public Wine Update(WineDTO wineDTO, Long id);

    public String Delete(Long id);
}


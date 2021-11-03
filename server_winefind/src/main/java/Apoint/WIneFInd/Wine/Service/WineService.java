package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;
import java.util.Optional;

public interface WineService {
    //adsf
    public Wine Save(WineDTO wineDTO);

    public List<Wine> FindByAll();

    public Optional<Wine> FindById(Long id);

    public Wine Update(Wine wine);

    public List<Wine> Delete(Long id);
}


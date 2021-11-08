package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;

public interface WineRepositoryCustom {


    // 리스트가 아닐경우일수도?
    List<Wine> FindByWineFiltering(WineFilterDTO filterDTO);

//    Wine FindFilteringWine(List<Long> longTypeList);

//    List<Wine> findByWineName(String winename, String type);

}

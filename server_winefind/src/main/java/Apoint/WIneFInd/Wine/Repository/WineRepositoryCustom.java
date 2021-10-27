package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;

public interface WineRepositoryCustom {

    List<Wine> findByWineName(String winename, String type);
}

package Apoint.WIneFInd.Repository;

import Apoint.WIneFInd.Model.Wines;

import java.util.List;

public interface CustomWineRepository {
    List<Wines> findByWineName(String winename);
}

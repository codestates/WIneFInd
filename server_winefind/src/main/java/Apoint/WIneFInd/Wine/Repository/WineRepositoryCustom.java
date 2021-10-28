package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;

public interface WineRepositoryCustom {

//    List<Wine> findByWineFilter(List<String> typesList, List<String> countriesList, List<String> sweetnessList,
//                                List<String> acidityList, List<String> bodyList, List<String> priceList);

    List<Wine> findByWineFilter(List<String> typesList, List<String> countriesList, List<String> sweetnessList);

    List<Wine> findById(List<Long> longTypeList);

//    List<Wine> findByWineName(String winename, String type);

}

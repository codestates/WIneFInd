package Apoint.WIneFInd.Wine.Repository;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;

public interface WineRepositoryCustom {

    List<Wine> FindByWineFiltering(WineFilterDTO filterDTO);

}

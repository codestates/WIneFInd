package Apoint.WIneFInd.Recommend.Service;

import Apoint.WIneFInd.Recommend.Domain.RecommendDTO;
import Apoint.WIneFInd.Recommend.Model.Recommend;

import java.util.List;

public interface RecommendService {
//ahah

    public Recommend Save(RecommendDTO recommendDTO);

    public List<Recommend> FindByConsumerId(Long id);

    public void DeleteRecommend(Long id, Long wineId);
}

package Apoint.WIneFInd.Recommended.Service;

import Apoint.WIneFInd.Recommended.Domain.RecommendedDTO;
import Apoint.WIneFInd.Recommended.Model.Recommended;

import java.util.List;

public interface RecommendedService {

    public Recommended Save(RecommendedDTO recommendedDTO);

    public List<Recommended> FindByUserId(Long id);

    public String DeleteRecommended(Long id, Long articleId);
}

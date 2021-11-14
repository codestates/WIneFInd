package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;

import java.util.List;
import java.util.Optional;

public interface WineService {

    // 와인의 등록
    public Wine Save(WineDTO wineDTO);

    // 와인 전체 조회
    public List<Wine> FindByAll();

    // 와인 Id 찾기
    public Wine FindById(Long id);

    // 와인 수정
    public Wine Update(WineDTO wineDTO, Long id);

    // 와인 삭제
    public String Delete(Long id);

    // 와인 종류 필터링
    public List<Wine> FindByWineFiltering(WineFilterDTO wineFilterDTO);

    }


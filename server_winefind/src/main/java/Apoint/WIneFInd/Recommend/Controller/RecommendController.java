package Apoint.WIneFInd.Recommend.Controller;


import Apoint.WIneFInd.Recommend.Domain.RecommendDTO;
import Apoint.WIneFInd.Recommend.Model.Recommend;
import Apoint.WIneFInd.Recommend.Service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class RecommendController {
    //as
    private final RecommendService recommendService;

    @Autowired
    public RecommendController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @GetMapping("recommend")
    public ResponseEntity<?> FindRecommend(@RequestParam Long id) {

        try {
            List<Recommend> recommends = recommendService.FindByConsumerId(id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Show Recommend", recommends);
            }});
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("해당 'Id' 에는 추천 리스트 존재 하지 않습니다. \n");
        }
    }

    @PostMapping("recommend")
    public ResponseEntity<?> AddRecommend(@RequestBody RecommendDTO recommendDTO) {

        try {
            Recommend addRecommend = recommendService.Save(recommendDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Add RecommendList", addRecommend);
            }});
        } catch (NonUniqueResultException e) {
            return ResponseEntity.status(500).body("추천리스트에 동일한 물품이 있습니다. \n");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("추천리스트에 'Consumer' & 'Wine' 정보가 존재하지 않습니다. \n");
        } catch (InvalidDataAccessApiUsageException e) {
            return ResponseEntity.status(500).body("RecommendDTO 양식에 맞지 않습니다. \n");
        }
    }

    @DeleteMapping("recommend")
    public ResponseEntity<?> DeleteRecommend(@RequestParam Long id,
                                             @RequestParam(required = false) Long wineId) {

        recommendService.DeleteRecommend(id, wineId);
        return ResponseEntity.ok().body("Delete Success");
    }
}

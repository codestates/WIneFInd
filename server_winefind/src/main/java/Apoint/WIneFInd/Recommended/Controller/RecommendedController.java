package Apoint.WIneFInd.Recommended.Controller;


import Apoint.WIneFInd.Recommended.Domain.RecommendedDTO;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import Apoint.WIneFInd.Recommended.Service.RecommendedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class RecommendedController {

    private final RecommendedService recommendedService;

    @Autowired
    public RecommendedController(RecommendedService recommendedService) {
        this.recommendedService = recommendedService;
    }

    // 유저 추천리스트에 와인 생성하기
    @PostMapping("recommended")
    public ResponseEntity<?> CreateRecommend(@RequestBody RecommendedDTO recommendedDTO) {

        try {
            // recommendDTO 양식에 맞춰서 유저 리스트에 추천와인 생성 진행
            // 만약 예외가 발생하면 아래의 예외처리 실행
            Recommended getRecommended = recommendedService.Save(recommendedDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userRecommend", getRecommended);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 추천리스트를 ‘생성’ 할 수 없습니다. \n" + e);
        } catch (InvalidDataAccessApiUsageException e) {
            return ResponseEntity.status(500).body("'RecommendedDTO' 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }
    }

    // 유저가 가지고 있는 추천 리스트 목록 조회
    @GetMapping("recommended")
    public ResponseEntity<?> FindRecommended(@RequestParam Long id) {
        try {
            // 입력받은 id 로 유저정보의 추천리스트를 조회 및 실패시 에러 처리
            List<Recommended> recommendeds = recommendedService.FindByUserId(id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("userRecommended", recommendeds);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 유저의 추천리스트 를 ‘조회’ 할 수 없습니다. \n" + e);

        }
    }


    // 추천리스트의 개별 삭제  & 전체삭제
    @DeleteMapping("recommended/{userId}")
    public ResponseEntity<?> DeleteRecommended(@PathVariable Long userId,
                                               @RequestParam(required = false) Long wineId) {

        try {
            // wineId의 값이 없을면 userId 값에 해당하는 추천리스트 전체삭제
            // wineId의 값이 있으면 userId 추천 리스트의 wineId 삭제
            String deleteRecommended = recommendedService.DeleteRecommended(userId, wineId);
            return ResponseEntity.ok().body(deleteRecommended);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당유저의 추천 리스트를 '삭제' 할 수 없습니다. \n" + e);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당유저의 추천 리스트를 ‘삭제’ 할 수 없습니다. \n" + e);
        }
    }
}

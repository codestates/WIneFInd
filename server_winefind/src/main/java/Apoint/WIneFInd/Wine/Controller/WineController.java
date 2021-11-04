package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class WineController {

    private WineRepository wineRepository;
    private final WineService wineService;

    @Autowired
    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

    // "Wine" 생성
    @PostMapping("wine")
    public ResponseEntity<?> CreateWine(@RequestBody WineDTO wineDTO) {

        try {
            // 입력받은 'wineDTO'로 와인 생성
            Wine wineSave = wineService.Save(wineDTO);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("wineInfo", wineSave);
            }});
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("'WineDTO' 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }
    }

    // 필터링이 List로 들어왔을 경우 처리하기
    // WineFilter 로 받아서 처리 해보기 일단은 keep
    @GetMapping("wines")
    Iterable<Wine> FindFilterWine(@RequestParam(required = false) List<String> typesList,
                                  @RequestParam(required = false) List<String> countriesList,
                                  @RequestParam(required = false) List<String> sweetnessList
//                       ,
//                       @RequestParam(required = false) List<String> acidityList,
//                       @RequestParam(required = false) List<String> bodyList,
//                       @RequestParam(required = false) List<String> priceList
    ) {
        if (typesList != null
//                && countriesList != null && sweetnessList != null && acidityList != null &&
//                bodyList != null && priceList != null
        ) {
            return wineRepository.findByWineFilter(typesList, countriesList
                    , sweetnessList
//                    , acidityList, bodyList, priceList
            );
        } else {
            return wineRepository.findAll();
        }
    }


    // "Wine"전체 조회 & 개별 조회
    @GetMapping("wine")
    public ResponseEntity<?> FindWine(@RequestParam(required = false) Long id) {

        try {
            // Param 으로 값이 들어오면 Param 값으로 "Wine" 조회
            if (id != null) {
                Wine wine = wineService.FindById(id);
                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("wineInfo", wine);
                }});
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 와인을 '조회' 할 수 없습니다. \n" + e);
        }
        // Param 으로 값이 들어오지 않으면 "Wine" 전체 조회
        List<Wine> wines = wineService.FindByAll();
        return ResponseEntity.ok().body(new HashMap<>() {{
            put("winesInfo", wines);
        }});

    }


    // 와인 수정
    @PutMapping("wine/{id}")
    public ResponseEntity<?> UpdateWine(@RequestBody WineDTO wineDTO, @PathVariable Long id) {

        try {
            // 입력받은
            Wine updateWine = wineService.Update(wineDTO, id);
            return ResponseEntity.ok().body(updateWine);
            } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 와인을 '수정' 할 수 없습니다. \n" + e);
        }
    }

    // 와인 삭제
    @DeleteMapping("wine/{id}")
    public ResponseEntity<?> DeleteWine(@PathVariable Long id) {

        try {
            String deleteWine = wineService.Delete(id);
            return ResponseEntity.ok().body(deleteWine);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당 와인을 '삭제' 할 수 없습니다. \n" + e);

        }
    }
}
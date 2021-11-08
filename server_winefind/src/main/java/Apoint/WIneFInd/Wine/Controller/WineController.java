package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
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
    // WineFilterDTO 로 받아서 처리 해보려고 했는데...
    // RequestBody 를 권장하지 않으니 일일이 받아야 하나...?
    @GetMapping("wine/filter")
    ResponseEntity<?> FindFilterWine(@RequestParam(required = false) List<String> typesList,
                                     @RequestParam(required = false) List<String> countriesList,
                                     @RequestParam(required = false) List<String> sweetnessList,
                                     @RequestParam(required = false) List<String> acidityList,
                                     @RequestParam(required = false) List<String> bodyList,
                                     @RequestParam(required = false) List<String> priceList) {

        WineFilterDTO wineFilterDTO = WineFilterDTO.builder()
                .typesList(typesList)
                .countriesList(countriesList)
                .sweetnessList(sweetnessList)
                .acidityList(acidityList)
                .bodyList(bodyList)
                .priceList(priceList)
                .build();

//        System.out.println("wineFilterDTO 값 제대로 들어왔니??? " + wineFilterDTO.getTypesList().toString());
//        System.out.println("wineFilterDTO 값 제대로 들어왔니??? " + wineFilterDTO.getCountriesList().toString());
        try {
            List<Wine> wines = wineService.FindByWineFiltering(wineFilterDTO);
            return ResponseEntity.ok().body(wines);

        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("필터링을 수행한 결과 아무값도 '조회’ 할 수 없습니다. \n" + e);
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
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(500).body("해당 와인을 '수정' 할 수 없습니다. wineDTO 양식에 맞춰" +
                    "다시 작성해 주세요 \n" + e);
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
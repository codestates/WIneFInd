package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
//@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
public class WineController {

    private final WineService wineService;

    private final HashMap hashMap;

    @Autowired
    public WineController(WineService wineService, HashMap hashMap) {
        this.wineService = wineService;
        this.hashMap = hashMap;
    }

    // "Wine" 생성
    @PostMapping("wine")
    public ResponseEntity<?> CreateWine(@RequestBody WineDTO wineDTO) {

        // 입력받은 'wineDTO'로 와인 생성
        Wine wineSave = wineService.Save(wineDTO);

        return ResponseEntity.ok().body(hashMap.put("wineInfo", wineSave));

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

        List<Wine> wines = wineService.FindByWineFiltering(wineFilterDTO);

        return ResponseEntity.ok().body(hashMap.put("wineInfo", wines));
    }


    // "Wine"전체 조회 & 개별 조회
    @GetMapping("wine")
    public ResponseEntity<?> FindWine(@RequestParam(required = false) Long id) {


        // Param 으로 값이 들어오면 Param 값으로 "Wine" 조회
        if (id != null) {
            Wine wine = wineService.FindById(id);
            return ResponseEntity.ok().body(hashMap.put("wineInfo", wine));
        }

        // Param 으로 값이 들어오지 않으면 "Wine" 전체 조회
        List<Wine> wines = wineService.FindByAll();

        return ResponseEntity.ok().body(hashMap.put("wineInfo", wines));
    }

    // 와인 수정
    @PutMapping("wine/{id}")
    public ResponseEntity<?> UpdateWine(@RequestBody WineDTO wineDTO, @PathVariable Long id) {

        // 입력받은 Id로 와인 수정
        Wine updateWine = wineService.Update(wineDTO, id);

        return ResponseEntity.ok().body(hashMap.put("wineInfo", updateWine));
    }

    // 와인 삭제
    @DeleteMapping("wine/{id}")
    public ResponseEntity<?> DeleteWine(@PathVariable Long id) {

        // 입력받은 Id로 와인 삭제
        String deleteWine = wineService.Delete(id);

        return ResponseEntity.ok().body(deleteWine);
    }
}
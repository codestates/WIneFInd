package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class WineController {

    private final WineService wineService;

    @Autowired
    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

    // 와인 생성
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
    // post로 처리 하려고 했으나 클라이언트에서 post로 보내는게 여의치 않아서 get으로 변경
    @GetMapping("wine/filter")
    ResponseEntity<?> FindFilterWine(@RequestParam(required = false) List<String> typesList,
                                     @RequestParam(required = false) List<String> countriesList,
                                     @RequestParam(required = false) List<String> sweetnessList,
                                     @RequestParam(required = false) List<String> acidityList,
                                     @RequestParam(required = false) List<String> bodyList,
                                     @RequestParam(required = false) List<String> priceList) {


        // FindByWineFiltering 로 데이터를 내려보낼때 깔끔하게 내려보내고 싶어서 컨트롤러에서
        // 빌더 패턴으로 저장
        WineFilterDTO wineFilterDTO = WineFilterDTO.builder()
                .typesList(typesList)
                .countriesList(countriesList)
                .sweetnessList(sweetnessList)
                .acidityList(acidityList)
                .bodyList(bodyList)
                .priceList(priceList)
                .build();
        try {
            // 입력받은 정보로 와인 필터링
            List<Wine> wines = wineService.FindByWineFiltering(wineFilterDTO);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("wineInfo", wines);
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.status(500).body("필터링을 수행한 결과 아무값도 '조회’ 할 수 없습니다. \n" + e);
        }
    }


    // 와인 전체 조회 & 개별 조회
    @GetMapping("wine")
    public ResponseEntity<?> FindWine(@RequestParam(required = false) Long id) {

        try {
            // id 값이 존재 한다면 Id값에 해당하는 와인 조회
            if (id != null) {
                Wine wine = wineService.FindById(id);

                return ResponseEntity.ok().body(new HashMap<>() {{
                    put("wineInfo", wine);
                }});
            }
            // id 값이 존재 하지 않는다면 해당 와인 전체 조회
            List<Wine> wines = wineService.FindByAll();
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("wineInfo", wines);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 와인을 '조회' 할 수 없습니다. \n" + e);
        }
    }

    // 와인 수정
    @PutMapping("wine/{id}")
    public ResponseEntity<?> UpdateWine(@RequestBody WineDTO wineDTO, @PathVariable Long id) {

        try {
            // 입력받은 Id로 와인 수정
            Wine updateWine = wineService.Update(wineDTO, id);

            return ResponseEntity.ok().body(new HashMap<>() {{
                put("wineInfo", updateWine);
            }});
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
            // 입력받은 Id로 와인 삭제
            String deleteWine = wineService.Delete(id);

            return ResponseEntity.ok().body(deleteWine);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당 와인을 '삭제' 할 수 없습니다. \n" + e);
        }
    }
}

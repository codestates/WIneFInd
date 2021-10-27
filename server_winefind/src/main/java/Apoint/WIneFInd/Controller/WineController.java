package Apoint.WIneFInd.Controller;

import Apoint.WIneFInd.Domain.WineDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Model.Wines;
import Apoint.WIneFInd.Service.WineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class WineController {

    private final WineService wineService;

    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

//    Wine 생성
    @PostMapping(value = "/wine")
    public ResponseEntity<?> CreateWine(@RequestBody WineDTO wineDTO) {
        wineService.CreateArticle(wineDTO);

        return ResponseEntity.ok().body(new HashMap<>(){{
            put("message", "create success!");
        }});
    }

//    Wine 조회
    @GetMapping(value = "/wine")
    public ResponseEntity<?> FindByIdWine(@RequestParam(required = false) Long id) {
        if (id != null) {
            Wines wine = wineService.FindById(id);
            return ResponseEntity.ok().body(wine);
        } else {
            List<Wines> wines = wineService.FindByAll();
            return ResponseEntity.ok().body(wines);
        }
    }

    @GetMapping(value = "/wines")
     public List<Wines> FindByIdWines(@RequestParam(required = false) String wineName,
                                      @RequestParam(required = false) String type,
                                      @RequestParam(required = false) String country,
                                      @RequestParam(required = false) String grape,
                                      @RequestParam(required = false) String vintage,
                                      @RequestParam(required = false) String sweet,
                                      @RequestParam(required = false) String acidity,
                                      @RequestParam(required = false) String body,
                                      @RequestParam(required = false) String tannic,
                                      @RequestParam(required = false) String image,
                                      @RequestParam(required = false) String comment,
                                      @RequestParam(required = false) String price) {

        return wineService.FindByWines(wineName, type, country, grape, vintage, sweet,
                acidity, body, tannic, image, comment, price);
    }

    

    @PutMapping(value = "/wine")
    public ResponseEntity<?> UpdateWine(@RequestBody Wines wine) {
        wineService.UpdateWine(wine);
        return ResponseEntity.ok().body("update success");
    }

    @DeleteMapping(value = "/wine/{id}")
    public ResponseEntity<?> DeleteWine(@PathVariable Long id) {
        wineService.DeleteWine(id);
        return ResponseEntity.ok().body("delete success");
    }
}

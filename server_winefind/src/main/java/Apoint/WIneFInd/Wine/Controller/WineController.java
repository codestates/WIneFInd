package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class WineController {

    private WineRepository wineRepository;
    private final WineService wineService;

    @Autowired
    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

    @GetMapping("wines")
    Iterable<Wine> test(@RequestParam(required = false) List<String> typesList,
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

    @PostMapping("wine")
    public ResponseEntity<?> CreateWine(@RequestBody Wine wine) {

        Wine save = wineService.Save(wine);

        return ResponseEntity.ok().body(new HashMap<>() {{
            put("message", save);
        }});
    }

    @GetMapping("wine")
    public ResponseEntity<?> FindWine(@RequestParam(required = false) Long id) {

        if (id != null) {
            Optional<Wine> wine = wineService.FindById(id);
            return ResponseEntity.ok().body(wine);
        } else {
            List<Wine> wines = wineService.FindByAll();
            return ResponseEntity.ok().body(wines);
        }
    }

    @PutMapping("wine")
    public ResponseEntity<?> UpdateWine(@RequestBody Wine wine) {

        Wine updateWine = wineService.Update(wine);
        return ResponseEntity.ok().body(updateWine);
    }

    @DeleteMapping("wine/{id}")
    public ResponseEntity<?> DeleteWine(@PathVariable Long id) {

        List<Wine> deleteWine = wineService.Delete(id);
        return ResponseEntity.ok().body(deleteWine);
    }
}
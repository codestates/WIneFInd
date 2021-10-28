package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WineController {

    private final WineRepository wineRepository;

    public WineController(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
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

    /*@GetMapping("wine")
    Iterable<Wine> all (@RequestParam(required = false) String text, @RequestParam(required = false) String type){
        Iterable<Wine> wines = null;
        if(text != null){
            return wineRepository.findByWineName(text, type);
        } else {
            return wineRepository.findAll();
        }
    }*/

}

package Apoint.WIneFInd.Wine.Controller;

import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WineController {

    private final WineRepository wineRepository;

    public WineController(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    @GetMapping("wine")
    Iterable<Wine> all (@RequestParam(required = false) String text, @RequestParam(required = false) String type){
        Iterable<Wine> wines = null;
        if(text != null){
            return wineRepository.findByWineName(text, type);
        } else {
            return wineRepository.findAll();
        }
    }
}

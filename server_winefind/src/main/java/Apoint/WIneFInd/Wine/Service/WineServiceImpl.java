package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class WineServiceImpl implements WineService {

    private final WineRepository wineRepository;

    @Autowired
    public WineServiceImpl(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    // 와인 생성
    @Override
    public Wine Save(WineDTO wineDTO) {

        // 입력받은 WineDTO 에 따라 와인 생성
        try {
            Wine saveWine = Wine.builder()
                    .wineName(wineDTO.getWineName())
                    .type(wineDTO.getType())
                    .country(wineDTO.getCountry())
                    .grape(wineDTO.getGrape())
                    .vintage(wineDTO.getVintage())
                    .sweet(wineDTO.getSweet())
                    .acidity(wineDTO.getAcidity())
                    .body(wineDTO.getBody())
                    .tannic(wineDTO.getTannic())
                    .image(wineDTO.getImage())
                    .content(wineDTO.getContent())
                    .price(wineDTO.getPrice())
                    .build();

            return wineRepository.save(saveWine);

        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("'WineDTO' 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }

    }

    // 와인 전체 조회
    @Override
    @Transactional(readOnly = true)
    public List<Wine> FindByAll() {

        return wineRepository.findAll();
    }

    // 특정 Id에 해당하는 와인 조회
    @Override
    @Transactional(readOnly = true)
    public Wine FindById(Long id) {

        // 와인을 DB 안에서 찾을시 없으면 에러 있으면 와인 리턴
        Wine wine = getWine(id);

        // 와인 리턴
        return wine;
    }

    private Wine getWine(Long id) {
        return wineRepository.findById(id).orElseThrow(() -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 id : " + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");
        });
    }

    // 와인 수정
    @Override
    public Wine Update(WineDTO wineDTO, Long id) {

        try {
            // 입력받은 id로 와인 id 찾기
            Wine updateWine = getWine(id);

            updateWine.setWineName(wineDTO.getWineName());
            updateWine.setType(wineDTO.getType());
            updateWine.setCountry(wineDTO.getCountry());
            updateWine.setGrape(wineDTO.getGrape());
            updateWine.setVintage(wineDTO.getVintage());
            updateWine.setSweet(wineDTO.getSweet());
            updateWine.setAcidity(wineDTO.getAcidity());
            updateWine.setBody(wineDTO.getBody());
            updateWine.setTannic(wineDTO.getTannic());
            updateWine.setImage(wineDTO.getImage());
            updateWine.setContent(wineDTO.getContent());
            updateWine.setSweet(wineDTO.getPrice());

            // 수정된 와인 리턴
            return updateWine;

        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("WineDTO 양식에 맞춰 수정사항을 입력해 주세요. " + e);
        }
    }

    // 와인 정보 삭제
    @Transactional(noRollbackFor = EmptyResultDataAccessException.class)
    public String Delete(Long id) {

        try {
            wineRepository.deleteById(id);
            return "'Wine' 정보가 성공적으로 '삭제' 처리 되었습니다.";
            // Id 에 해당하는 와인이 존재하지 않을 경우
        } catch (EmptyResultDataAccessException e) {
            return "와인을 삭제하시려면 " + id + " 를 제외한 'Id' 를 다시 입력해 주세요 " + e;
        }
    }

    // 와인 동적 필터링 구현
    @Override
    @Transactional(readOnly = true)
    public List<Wine> FindByWineFiltering(WineFilterDTO wineFilterDTO) {

        try {
            // 와인 wineFilterDTO 가 들어온 데이터에 맞춰서 필터링
            return wineRepository.FindByWineFiltering(wineFilterDTO);
        } catch (NullPointerException e) {
            throw new NullPointerException("필터링을 수행한 결과 아무값도 '조회’ 할 수 없습니다. \n" + e);
        }
    }


}

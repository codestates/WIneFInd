package Apoint.WIneFInd.Wine.Service;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WineServiceImpl implements WineService {

    private final WineRepository wineRepository;

    @Autowired
    public WineServiceImpl(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    // 와인 정보 생성
    @Override
    @Transactional
    public Wine Save(WineDTO wineDTO) {

        // 입력받은 와인 정보에 따라 와인 생성
        Wine createWine = getCreateWine(wineDTO);

        return wineRepository.save(createWine);
    }

    private Wine getCreateWine(WineDTO wineDTO) {
        Wine createWine = Wine.builder()
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
        return createWine;
    }


    // DB 안의 "Wine" 리스트 전체 조회
    @Override
    @Transactional(readOnly = true)
    public List<Wine> FindByAll() {

        return wineRepository.findAll();
    }

    // 입력받은 "Id"로 DB 안의 "Wine" 조회
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

    // 와인 정보 수정
    @Override
    @Transactional
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
            // 입력받은 와인 형식에 맞춰서 업데이트 매소드 실행

            // 업데이트 리턴
            return updateWine;
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("WineDTO 양식에 맞춰 수정사항을 입력해 주세요. " + e);
        }
    }

    // 와인 정보 삭제
    @Override
    // 흠... no... for... 다해봤는데 왜 try catch로 안가지... 음...
    // 예외가 발생하면 아무것도 실행 안하고 그냥 롤백 하나? 에러 지정 못하나?
    // 내가 졌다... 아무것도 안되네 ㅁㅇㄹㅁㅇㄴㄹ
    @Transactional(noRollbackFor = EmptyResultDataAccessException.class)
    public String Delete(Long id) {

        try {
            wineRepository.deleteById(id);
            return "'Wine' 정보가 성공적으로 '삭제' 처리 되었습니다.";
        } catch (EmptyResultDataAccessException e) {
            return "와인을 삭제하시려면 " + id + " 를 제외한 'Id' 를 다시 입력해 주세요 " + e;
        }
    }

    @Override
    @Transactional
    public List<Wine> FindByWineFiltering(WineFilterDTO wineFilterDTO) {

        return wineRepository.FindByWineFiltering(wineFilterDTO);
    }


}

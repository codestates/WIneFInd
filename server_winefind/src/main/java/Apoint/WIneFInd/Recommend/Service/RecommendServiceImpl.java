package Apoint.WIneFInd.Recommend.Service;

import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;
import Apoint.WIneFInd.Recommend.Domain.RecommendDTO;
import Apoint.WIneFInd.Recommend.Model.Recommend;
import Apoint.WIneFInd.Recommend.Repository.RecommendRepository;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RecommendServiceImpl implements RecommendService {
//ahah

    private final RecommendRepository recommendRepository;
    private final KakaoRepository kakaoRepository;
    private final WineRepository wineRepository;

    @Autowired
    public RecommendServiceImpl(RecommendRepository recommendRepository, KakaoRepository kakaoRepository, WineRepository wineRepository) {
        this.recommendRepository = recommendRepository;
        this.kakaoRepository = kakaoRepository;
        this.wineRepository = wineRepository;
    }


    @Override
    public Recommend Save(RecommendDTO recommendDTO) {

        Consumer consumer = kakaoRepository.findById(recommendDTO.getConsumerId()).get();
        Wine wine = wineRepository.findById(recommendDTO.getWineId()).get();

        List<Recommend> byConsumer = recommendRepository.findByConsumer(consumer);

        Optional<Recommend> checkWine = byConsumer
                .stream()
                .filter(item -> item.getWine().getId().equals(recommendDTO.getWineId()))
                .findAny();

        if (!checkWine.isEmpty()) throw new NoSuchElementException("이미 같은 'wine'을 추천 받으셨습니다.");

        Recommend recommend = new Recommend();
        recommend = recommend.builder()
                .consumer(consumer)
                .wine(wine)
                .build();

        return recommendRepository.save(recommend);

    }

    @Override
    public List<Recommend> FindByConsumerId(Long id) {

        Consumer consumer = kakaoRepository.findById(id).get();

        List<Recommend> consumerList = recommendRepository.findByConsumer(consumer);

        if (consumerList.isEmpty()) throw new NoSuchElementException("다시 조회해주시길 바랍니다.");

        return consumerList;
    }

    @Override
    public void DeleteRecommend(Long id, Long wineId) {

        Consumer consumer = kakaoRepository.findById(id).get();

        List<Recommend> consumerList = recommendRepository.findByConsumer(consumer);


        if (wineId != null) {
            Optional<Recommend> findRecommendWineId = consumerList
                    .stream()
                    .filter(item -> item.getWine().getId().equals(wineId))
                    .findAny();

            recommendRepository.deleteById(findRecommendWineId.get().getId());
        } else {
            recommendRepository.deleteAll(consumerList);
        }
    }
}

package Apoint.WIneFInd.Recommended.Service;

import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import Apoint.WIneFInd.Recommended.Domain.RecommendedDTO;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import Apoint.WIneFInd.Recommended.Repository.RecommendedRepository;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NonUniqueResultException;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendedServiceImpl implements RecommendedService {

    private final RecommendedRepository recommendedRepository;
    private final MemberService memberService;
    private final WineService wineService;

    @Autowired
    public RecommendedServiceImpl(RecommendedRepository recommendedRepository, MemberService memberService, WineService wineService) {
        this.recommendedRepository = recommendedRepository;
        this.memberService = memberService;
        this.wineService = wineService;
    }

    // 추천 리스트 생성
    @Override
    @Transactional
    public Recommended Save(RecommendedDTO recommendedDTO) {

        // 추천받는 받는 UserId와 추천 받을 WineId 를 입력 받아서
        // 각각에 해당하는 정보들을 조회하기
        User user = getByUser(recommendedDTO.getUserId());
        Wine wine = wineService.FindById(recommendedDTO.getWineId());

        // 조회한 유저 정보를 가지고 추천리스트 DB 안에 User 조회
        List<Recommended> byRecommendedUser = getByRecommendedUser(user);

        // 유저 추천 리스트 체크
        // 입력 받은 유저의 체크 리스트안에 입력받은 와인 아이디가 있는지 없는지를 확인
        Optional<Recommended> RecommendedUserCheck = validDuplicateCheck(recommendedDTO.getWineId(), byRecommendedUser);

        // 만약 userRecommendCheck 안에 값이 비어있지 않다면 throw 발생
        // 비어 있다면 추천리스트에 와인 생성
        if (!RecommendedUserCheck.isEmpty())
            throw new NonUniqueResultException("원하는 결과를 얻으시려면 wineId : "
                    + RecommendedUserCheck.get().getWine().getId() +
                    " 를 제외한 'wineId' 를 다시 입력해 주세요. ");

        // 추천 리스트에 생성
        Recommended recommended = Recommended.builder()
                .user(user)
                .wine(wine)
                .build();

        // 추천 리스트 저장
        return recommendedRepository.save(recommended);
    }

    private Optional<Recommended> validDuplicateCheck(Long id, List<Recommended> byRecommendedUser) {
        Optional<Recommended> RecommendedUserCheck = byRecommendedUser
                .stream()
                .filter(u -> u.getWine().getId().equals(id))
                .findAny();
        return RecommendedUserCheck;
    }

    private List<Recommended> getByRecommendedUser(User user) {
        return recommendedRepository.findByUser(user);
    }

    private User getByUser(Long userId) {
        return memberService.FindById(userId);
    }


    // 유저가 가지고 있는 추천리스트 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<Recommended> FindByUserId(Long id) {

        // 입력받은 아이디에 해당하는 유저 조회
        User user = getByUser(id);

        // 추천리스트 DB 안에 입력받은 유저와 일치하는 정보 가져오기
        List<Recommended> userRecommendedList = getByRecommendedUser(user);

        // 만약 찾아온 유저의 추천리스트가 비어 있다면 throw 발생
        if (userRecommendedList.isEmpty())
            throw new IllegalArgumentException(
                    "원하는 결과를 얻으시려면 id : " + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");

        // 비어 있지 않다면 저장
        return userRecommendedList;
    }

    // 추천 리스트 전체 삭제 & 개별 삭제
    @Override
    public String DeleteRecommended(Long id, Long wineId) {

        // 입력받은 id로 유저 정보를 가져오기
        User user = getByUser(id);

        // 가져온 유저 정보를 바탕으로 추천 리스트에 해당 유저가
        // 가지고 있는 와인 리스트 가져오기
        List<Recommended> byRecommendedUser = getByRecommendedUser(user);

        // WineId가 null 이 아니면 해당 추천받은 와인 하나만 삭제
        // WineId가 null 이면 추천받은 와인 리스트 전체 삭제
        try {
            if (wineId != null) {
                Optional<Recommended> recommended = validDuplicateCheck(wineId, byRecommendedUser);
                // recommended 유저정보 안에 추천리스트가 존재 하지 않다면 throw
                recommended.orElseThrow(()->{
                    throw new IllegalArgumentException("원하는 결과를 얻으시려면 wineId : " + wineId + " 를 제외한 'wineId' 를 다시 입력해 주세요. ");
                });
                recommendedRepository.deleteById(recommended.get().getId());
            } else {
                recommendedRepository.deleteAll(byRecommendedUser);
            }
            // 삭제 처리가 정상적으로 완료하면 String 문 출력
            return "'RecommendedUser' 정보가 성공적으로 '삭제' 처리 되었습니다.";
        } catch (EmptyResultDataAccessException e) {
            return "추천 리스트를 삭제하시려면 " + id + " 를 제외한 'Id' 를 다시 입력해 주세요 " + e;
        }
    }
}

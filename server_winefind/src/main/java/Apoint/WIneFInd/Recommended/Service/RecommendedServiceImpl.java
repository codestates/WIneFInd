package Apoint.WIneFInd.Recommended.Service;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import Apoint.WIneFInd.Recommended.Domain.RecommendedDTO;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import Apoint.WIneFInd.Recommended.Repository.RecommendedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecommendedServiceImpl implements RecommendedService {

    private final RecommendedRepository recommendedRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    @Autowired
    public RecommendedServiceImpl(RecommendedRepository recommendedRepository, MemberService memberService, ArticleService articleService) {
        this.recommendedRepository = recommendedRepository;
        this.memberService = memberService;
        this.articleService = articleService;
    }

    // 추천 리스트 생성 & 유효성 검사
    @Override
    public Recommended Save(RecommendedDTO recommendedDTO) {

        // 추천받는 받는 UserId와 추천 받을 ArticleId 를 입력 받아서
        // 각각에 해당하는 정보들을 조회하기
        // 코드가 중복되면 매소드로 빼기... (근대 더 보기 복잡하지 않을까에 대해선 조금 의문)
        User user = getByUser(recommendedDTO.getUserId());
        Article article = articleService.FindById(recommendedDTO.getArticleId());

        // 조회한 유저 정보를 가지고 추천리스트 DB 안에 User 조회
        List<Recommended> byRecommendedUser = getByRecommendedUser(user);

        // 유저 추천 리스트 중복 체크
        // byRecommendedUser 의 추천리스트 에 이번에 들어오는 recommendedDTO.getArticleId()가 이미 존재 해 있는지를 중복 체크
        Optional<Recommended> RecommendedUserCheck = validDuplicateCheck(recommendedDTO.getArticleId(), byRecommendedUser);
        // 만약 userRecommendCheck 안에 값이 비어있지 않다면 이미 같은 ArticleId가 추천 되어있으므로 throw 발생
        // 값이 비어 있다면 추천리스트에 해당 ArticleId를 등록
        if (!RecommendedUserCheck.isEmpty())
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 wineId : "
                    + RecommendedUserCheck.get().getArticle().getId() +
                    " 를 제외한 'wineId' 를 다시 입력해 주세요. ");

        // 위의 유효성 검사를 통과할 시 추천 리스트에 해당 ArticleId를 생성
        Recommended recommended = Recommended.builder()
                .user(user)
                .article(article)
                .build();

        // 추천 리스트 저장
        return recommendedRepository.save(recommended);
    }

    private Optional<Recommended> validDuplicateCheck(Long id, List<Recommended> byRecommendedUser) {
        Optional<Recommended> RecommendedUserCheck = byRecommendedUser
                .stream()
                .filter(u -> u.getArticle().getId().equals(id))
                .findAny();
        return RecommendedUserCheck;
    }

    private List<Recommended> getByRecommendedUser(User user) {
        return recommendedRepository.findByUser(user);
    }

    private User getByUser(Long userId) {
        return memberService.FindById(userId);
    }


    // 추천리스트 조회
    @Override
    @Transactional(readOnly = true)
    public List<Recommended> FindByUserId(Long id) {

        // 추천리스트를 조회할 유저조회
        User user = getByUser(id);

        // 추천리스트 DB 안에 입력받은 유저와 일치하는 유저정보 가져오기
        List<Recommended> userRecommendedList = getByRecommendedUser(user);

        // 만약 찾아온 유저의 추천리스트가 비어 있다면 throw 발생
        if (userRecommendedList.isEmpty())
            throw new IllegalArgumentException(
                    "원하는 결과를 얻으시려면 id : " + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");

        // 비어 있지 않다면 추천리스트 리턴
        return userRecommendedList;
    }

    // 추천 리스트 전체 삭제 & 개별 삭제
    @Override
    public String DeleteRecommended(Long id, Long articleId) {

        // 추천리스트를 조회할 유저조회
        User user = getByUser(id);

        // 추천리스트 DB 안에 입력받은 유저와 일치하는 유저정보 가져오기
        List<Recommended> byRecommendedUser = getByRecommendedUser(user);


        try {
            // 추천 리스트를 하나만 지우기 위해서 articleId가 Null 아니면 articleId 에 맞는 추천리스트 삭제
            if (articleId != null) {
                Optional<Recommended> recommended = validDuplicateCheck(articleId, byRecommendedUser);
                // articleId 를 입력받았지만 추천리스트에 articleId와 일치하는 정보가 없을경우 err 발생!
                recommended.orElseThrow(() -> {
                    throw new IllegalArgumentException("원하는 결과를 얻으시려면 articleId : " + articleId + " 를 제외한 'articleId' 를 다시 입력해 주세요. ");
                });
                // 입력받은 articleId와 일치하는 articleId가 있을경우 삭제
                recommendedRepository.deleteById(recommended.get().getId());
            } else {
                // ArticleId가 null 이면 유저의 추천리스트 전체 삭제
                recommendedRepository.deleteAll(byRecommendedUser);
            }
            // 삭제 처리가 정상적으로 완료하면 String 문 출력
            return "'RecommendedUser' 정보가 성공적으로 '삭제' 처리 되었습니다.";
        } catch (EmptyResultDataAccessException e) {
            return "추천 리스트를 삭제하시려면 " + id + " 를 제외한 'Id' 를 다시 입력해 주세요 " + e;
        }
    }
}

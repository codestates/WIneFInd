package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Repository.ArticleRepository;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Service.WineService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final MemberService memberService;
    private final WineService wineService;

    public ArticleServiceImpl(ArticleRepository articleRepository, MemberService memberService, WineService wineService) {
        this.articleRepository = articleRepository;
        this.memberService = memberService;
        this.wineService = wineService;
    }

    // 게시글 생성
    @Override
    public Article Save(ArticleDTO articleDTO, Long id) {

        // 같은 제목의 게시물의 제목 중복 체크
        validateTitle(articleDTO.getTitle());

        // articleDTO 에서 입력받은 값으로 유저정보와 와인정보를 가져오기
        User user = memberService.FindById(articleDTO.getUserId());
        Wine wine = wineService.FindById(id);

        // 중복체크를 통과하면 게시글 저장
        Article article = Article.builder()
                .title(articleDTO.getTitle())
                .content(articleDTO.getContent())
                .user(user)
                .wine(wine)
                .build();

        // 게시글 등록
        return articleRepository.save(article);
    }

    private void validateTitle(String title) {
        articleRepository.findByTitle(title).ifPresent(t -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 title : "
                    + title + " 를 제외한 'title' 를 다시 입력해 주세요. ");
        });
    }

    // 게시글 전체 조회
    @Override
    @Transactional(readOnly = true)
    public List<Article> FindByAll() {

        return articleRepository.findAll();
    }

    // 게시글 페이징 처리를 위한 게시글 전체 조회
    @Override
    @Transactional(readOnly = true)
    public Page<Article> FindByAllPage(Pageable pageable) {

        return articleRepository.findAll(pageable);
    }


    // Id를 입력 받아서 해당 아이디의 게시물 찾기
    @Override
    @Transactional(readOnly = true)
    public Article FindById(Long id) {

        Article article = getArticle(id);

        return article;
    }

    private Article getArticle(Long id) {
        return articleRepository.findById(id).orElseThrow(() -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 id : " + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");
        });
    }

    // 게시물 수정
    @Override
    public Article Update(ArticleDTO articleDTO, Long id) {

        // 입력받은 Id 로 해당 게시물 찾기 만약 게시물이 없을경우 throw
        // 입력받은 값으로 게시물 수정작성
        Article updateArticle = getArticle(id);

        // articleDTO 양식에 맞춰 게시글 정보 수정
        updateArticle.setContent(articleDTO.getTitle());
        updateArticle.setTitle(articleDTO.getContent());

        // 게시물 수정
        return updateArticle;
    }

    private Article getArticleTitle(String title) {
        return articleRepository.findByTitle(title).orElseThrow(() -> {
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 title : "
                    + title + " 를 제외한 'title' 를 다시 입력해 주세요. ");
        });
    }

    // 게시물 삭제
    @Override
    public String Delete(Long id) {

        try {
            // 입력받은 id에 해당하는 게시글 삭제
            articleRepository.deleteById(id);
            return "'Article' 정보가 성공적으로 '삭제' 처리 되었습니다.";
        } catch (EmptyResultDataAccessException e) {
            return "와인을 삭제하시려면 " + id + " 를 제외한 'Id' 를 다시 입력해 주세요 " + e;
        }
    }

    @Override
    public Page<Article> FindByTotalSearch(String text, Pageable pageable) {

        try {
            // 텍스트 에 포함된 내용으로 해당 게시글 찾기
            return articleRepository.FindByTotalSearch(text, pageable);

        } catch (InvalidDataAccessApiUsageException e) {
            throw new InvalidDataAccessApiUsageException("Page 넘버가 총 아이템 갯수의 범위를 벗어 났습니다 ! " + e);
        }
    }

    @Override
    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable) {

        // Client 의 카테고리 버튼을 통해 List로 들어오는 데이터들 필터링 처리
        return articleRepository.FindByArticleFiltering(articleFilterDTO, pageable);
    }

    @Override
    public List<Article> FindByRecommendedWineAlgo(ArticleAlgorithmDTO articleAlgorithmDTO) {

        // 와인을 추천해 주기위한 알고리즘
        return articleRepository.FindByRecommendedWineAlgo(articleAlgorithmDTO);
    }
}
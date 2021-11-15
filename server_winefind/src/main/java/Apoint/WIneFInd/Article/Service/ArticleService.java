package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Wine.Domain.WineFilterDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleService {

    // 게시글 등록
    public Article Save(ArticleDTO articleDTO, Long id);

    // 모든 게시글 조회
    public List<Article> FindByAll();

    // 모든 게시글 페이지네이션으로 조회
    public Page<Article> FindByAllPage(Pageable pageable);

    // 게시글 Id 로 조회
    public Article FindById(Long id);

    // 게시글 수정
    public Article Update(ArticleDTO articleDTO, Long id);

    // 게시글 삭제
    public String Delete(Long id);

    // 텍스트 에 포함된 내용으로 해당 게시글 찾기
    public Page<Article> FindByTotalSearch(String text, Pageable pageable);

    // Client 의 카테고리 버튼을 통해 List로 들어오는 데이터들 필터링 처리
    public Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable);

    // 와인을 추천해 주기위한 알고리즘
    public List<Article> FindByRecommendedWineAlgo(ArticleAlgorithmDTO articleAlgorithmDTO);

}
package Apoint.WIneFInd.Article.Repository;

import Apoint.WIneFInd.Article.Domain.ArticleAlgorithmDTO;
import Apoint.WIneFInd.Article.Domain.ArticleFilterDTO;
import Apoint.WIneFInd.Article.Model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleRepositoryCustom {

    // text로 입력받은 단어가 포함된 글들을 찾기 위한 매소드
    Page<Article> FindByTotalSearch(String text, Pageable pageable);

    // 같은 타입이 List로 들어왔을경우 처리하기 위한 매소드
    Page<Article> FindByArticleFiltering(ArticleFilterDTO articleFilterDTO, Pageable pageable);

    // 추천 알고리즘을 처리하기 위한 매소드
    List<Article> FindByRecommendedWineAlgo(ArticleAlgorithmDTO articleAlgorithmDTO);
}

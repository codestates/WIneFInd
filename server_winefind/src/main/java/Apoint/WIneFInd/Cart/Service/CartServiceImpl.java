package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Repository.ArticleRepository;
import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Repository.CartRepository;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Repoistory.KakaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NonUniqueResultException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ArticleRepository articleRepository;
    private final KakaoRepository kakaoRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ArticleRepository articleRepository, KakaoRepository kakaoRepository) {
        this.cartRepository = cartRepository;
        this.articleRepository = articleRepository;
        this.kakaoRepository = kakaoRepository;
    }

    // 장바구니 생성 메소드!
    @Override
    public Cart Save(CartDTO cartDTO) {

        // 장바구니를 만들 때 "Consumer"와 "Article"을 등록해주기 위해서
        // 파라미터로 받은 "articleId" & "consumerId" 입력받아서 해당 데이터를 찾기
        Consumer findConsumer = kakaoRepository.findById(cartDTO.getConsumerId()).get();
        Article findArticle = articleRepository.findById(cartDTO.getArticleId()).get();

        // 장바구니에 이미 존재 하는지 안하는지를 체크
        Cart checkConsumer = cartRepository.findByConsumerId(findConsumer.getId());
        Cart checkArticle = cartRepository.findByArticleId(findArticle.getId());

        // "Consumer"가 이미 동일한 "Article"을 가지고 있으면 'NonUniqueResultException'
        if (checkConsumer != null && checkArticle != null)
            throw new NonUniqueResultException("다른 'Article'을 선택해 주세요.  ");

        // 장바구니에 "Consumer"가 동일한 "Article"을 가지고 있지 않다면
        // 장바구니에 정보를 저장합니다.
        Cart cart = new Cart();
        cart = cart.builder()
                .consumer(findConsumer)
                .article(findArticle)
                .build();

        return cartRepository.save(cart);

    }

    // 장바구니에서 "Consumer"를 조회하는 메소드
    @Override
    public List<Cart> FindByConsumerId(Long id) {

        // 입력받은 "Id"로 해당하는 "Consumer" 찾기
        Consumer findConsumer = kakaoRepository.findById(id).get();

        // 장바구니에서 해당 "Consumer"가 참조하는 모든 "Article"을 조회하기 위해서
        // "findConsumer"를 입력받아 장바구니 에서 "Consumer"조회
        List<Cart> consumerList = cartRepository.findByConsumer(findConsumer);

        // 장바구니에 해당하는 "Consumer"가 비어있으면 에러 발생!
        if (consumerList.isEmpty()) throw new NoSuchElementException("다시 조회하여 주시기 바랍니다. ");

        // "Consumer"가 있으면 결과 출력
        return consumerList;
    }

    @Override
    public void DeleteCart(Long id) {
        Long id1 = kakaoRepository.findById(id).get().getId();

        kakaoRepository.deleteById(id1);
    }
}

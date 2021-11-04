package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Repository.ArticleRepository;
import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Repository.CartRepository;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ArticleRepository articleRepository, MemberRepository memberRepository) {
        this.cartRepository = cartRepository;
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
    }

    // 장바구니 생성 메소드!
    @Override
    @Transactional
    public Cart Save(CartDTO cartDTO) {

        // 장바구니를 만들 때 "Consumer"와 "Article"을 생성해주기 위해서
        // 파라미터로 받은 "articleId" & "consumerId" 입력받아서 해당 데이터를 찾기
        User findConsumer = memberRepository.findById(cartDTO.getUserId()).get();
        Article findArticle = articleRepository.findById(cartDTO.getArticleId()).get();

        // 장바구니에 이미 존재 하는지 안하는지를 체크
        List<Cart> byConsumerId = cartRepository.findByUser(findConsumer);
//        List<Cart> checkArticle = cartRepository.findByArticle(findArticle);
        // "Consumer"가 이미 동일한 "Article"을 가지고 있으면 'NonUniqueResultException'
//        if (checkConsumer.get(0) != null && checkArticle.get(0) != null)
//            throw new IncorrectResultSizeDataAccessException("다른 'Article'을 선택해 주세요.  ",0);
        Optional<Cart> check = byConsumerId
                .stream()
                .filter(item -> item.getArticle().getId().equals(cartDTO.getArticleId()))
                .findAny();


        if (!check.isEmpty()) throw new IllegalArgumentException("다른 'Article'을 선택해 주세요.  ");


        // 장바구니에 "Consumer"가 동일한 "Article"을 가지고 있지 않다면
        // 장바구니에 정보를 저장합니다.

        Cart cart = new Cart();
        cart = cart.builder()
//                .consumer(findConsumer)
                .article(findArticle)
                .build();

        return cartRepository.save(cart);


    }

    // 장바구니에서 "Consumer"를 조회하는 메소드
    @Override
    public List<Cart> FindByUserId(Long id) {

        // 입력받은 "Id"로 해당하는 "Consumer" 찾기
        User findConsumer = memberRepository.findById(id).get();

        // 장바구니에서 해당 "Consumer"가 참조하는 모든 "Article"을 조회하기 위해서
        // "findConsumer"를 입력받아 장바구니 에서 "Consumer"조회
        List<Cart> consumerList = cartRepository.findByUser(findConsumer);

        // 장바구니에 해당하는 "Consumer"가 비어있으면 에러 발생!
        if (consumerList.isEmpty()) throw new NoSuchElementException("다시 조회하여 주시기 바랍니다. ");

        // "Consumer"가 있으면 결과 출력
        return consumerList;
    }

    @Override
    public String DeleteCart(Long id, Long artId) {
        User findConsumer = memberRepository.findById(id).get();

        List<Cart> byConsumer = cartRepository.findByUser(findConsumer);

        if (artId != null) {
            Optional<Cart> findCart = byConsumer
                    .stream()
                    .filter(item -> item.getArticle().getId().equals(artId))
                    .findAny();

            cartRepository.deleteById(findCart.get().getId());
        } else {
            cartRepository.deleteAll(byConsumer);
        }
        return null;
    }

}

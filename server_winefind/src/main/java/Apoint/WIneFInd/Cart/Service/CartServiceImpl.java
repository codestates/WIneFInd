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

import java.util.List;
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

    @Override
    public Cart Save(CartDTO cartDTO) {

        Cart cart = new Cart();

        Optional<Article> articleId = articleRepository.findById(cartDTO.getArticleId());
        Optional<Consumer> consumerId = kakaoRepository.findById(cartDTO.getConsumerId());

        if (articleId.isEmpty()) {
            throw new NullPointerException("Article 아이디가 존재 하지 않습니다.");
        } else if (consumerId.isEmpty()) {
            throw new NullPointerException("KaKao 아이디가 존재 하지 않습니다.");
        }

        cart.setArticle(articleId.get());
        cart.setConsumer(consumerId.get());

        return cartRepository.save(cart);

    }

    @Override
    public List<Cart> FindByConsumerId(Long id) {

        Consumer consumerId = kakaoRepository.findById(id).get();

        List<Cart> byConsumer = cartRepository.findByConsumer(consumerId);

        if (byConsumer.isEmpty()) {
            throw new NullPointerException("KaKao 아이디가 존재 하지 않습니다.");
        }

        return byConsumer;

//        return cartRepository.findByIdConsumer(id);
//        return cartRepository.findByConsumer(id);


    }
}

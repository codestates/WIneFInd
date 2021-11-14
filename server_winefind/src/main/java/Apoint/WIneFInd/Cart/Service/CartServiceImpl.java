package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Service.ArticleService;
import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Repository.CartRepository;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, MemberService memberService, ArticleService articleService) {
        this.cartRepository = cartRepository;
        this.memberService = memberService;
        this.articleService = articleService;
    }

    // 장바구니 생성
    @Override
    public Cart Save(CartDTO cartDTO) {

        // 장바구니를 만들 때 어떤 유저가(UserId) 어떤 판매글(ArticleId) 담을지를 알기위해서
        // 파라미터로 입력받은 "articleId" & "userId" 로 각각해당하는 유저 판매글 가져오기
        User user = memberService.FindById(cartDTO.getUserId());
        Article article = articleService.FindById(cartDTO.getArticleId());

        // user 정보를 바탕으로 장바구니 리스트에서 user와 같은 장바구니 조회
        List<Cart> byUser = getByCartUser(user);

        // byUser 의 장바구니에 이미 동일한 상품이 담겼는지를 체크
        Optional<Cart> checkCartItemList = getCartValidCheck(cartDTO.getArticleId(), byUser);

        // 만약 장바구니에 같은 상품이 존재하면 throw!
        if (!checkCartItemList.isEmpty())
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 articleId : "
                    + checkCartItemList.get().getArticle().getId() + " 를 제외한 'articleId' 를 다시 입력해 주세요. ");

        // 장바구니에 동일한 상품이 존재하지 않다면
        // 장바구니에 정보를 저장.
        Cart cart = Cart.builder()
                .user(user)
                .article(article)
                .build();

        return cartRepository.save(cart);
    }

    // 장바구니에서 "User"를 조회
    @Override
    @Transactional(readOnly = true)
    public List<Cart> FindByUserId(Long id) {

        // 입력받은 "Id"로 해당하는 "user" 찾기
        User user = memberService.FindById(id);

        // 장바구니리스트에서 user와 일치하는 장바구니 조회
        List<Cart> userList = getByCartUser(user);

        // userList 의 장바구니가 비어 있다면 throw
        if (userList.isEmpty())
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 id : "
                    + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");

        // userList 가 비어 있지 않다면 장바구니 리턴
        return userList;
    }

    // 장바구니 아이템 전체삭제 와 개별삭제 기능
    @Override
    public String DeleteCart(Long id, Long articleId) {

        // 입력받은 Id로 유저 정보 조회
        User user = memberService.FindById(id);

        // 장바구니 리스트에서 user 와 동일한 장바구니 찾기
        List<Cart> byCartUser = getByCartUser(user);

        // articleId 의 값이 존재 한다면 articleId 에 해당하는 상품 삭제
        if (articleId != null) {

            // 입력받은 articleId 값과 유저 장바구니에 담긴 articleId 이 같은지를 체크
            Optional<Cart> getUserCartItem = getCartValidCheck(articleId, byCartUser);
            // 만약 장바구니에 해당 아이템이 없다면 에러 처리
            getUserCartItem.orElseThrow(() -> {
                throw new IllegalArgumentException("원하는 결과를 얻으시려면 articleId : " + articleId + " 를 제외한 'articleId' 를 다시 입력해 주세요. ");
            });
            cartRepository.deleteById(getUserCartItem.get().getId());
        } else {
            // articleId 가 없다면 전체 삭제
            cartRepository.deleteAll(byCartUser);
        }
        return "'CartItem' 정보가 성공적으로 '삭제' 처리 되었습니다.";
    }

    private Optional<Cart> getCartValidCheck(Long articleId, List<Cart> byCartUser) {
        return byCartUser
                .stream()
                .filter(item -> item.getArticle().getId().equals(articleId))
                .findAny();
    }

    private List<Cart> getByCartUser(User user) {
        return cartRepository.findByUser(user);
    }

}

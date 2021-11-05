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
    @Transactional
    public Cart Save(CartDTO cartDTO) {

        // 장바구니를 만들 때 "User"와 "Article"을 생성해주기 위해서
        // 파라미터로 받은 "articleId" & "userId" 입력받아서 해당 데이터를 찾기
        User user = memberService.FindById(cartDTO.getUserId());
        Article article = articleService.FindById(cartDTO.getArticleId());

        // 유저의 장바구니에 물품이 담겼는지와 유효성 체크를 확인하기 위해서 위에서 입력받은 유저객체로
        // 장바구니 내에 유저 정보 찾기
        List<Cart> byUser = getByCartUser(user);

        // byUser에 장바구니에 같은 상품이 담겼는지를 체크
        Optional<Cart> checkCartItemList = getCartValidCheck(cartDTO.getArticleId(), byUser);

        // 만약 장바구니에 같은 상품이 존재하면 throw
        if (!checkCartItemList.isEmpty())
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 articleId : "
                    + checkCartItemList.get().getArticle().getId() + " 를 제외한 'articleId' 를 다시 입력해 주세요. ");

        // 장바구니에 "User"가 동일한 "Article"을 가지고 있지 않다면
        // 장바구니에 정보를 저장합니다.\
        Cart cart = new Cart();
        cart = cart.builder()
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

        // 장바구니에서 해당 "user"가 참조하는 모든 "Article"을 조회하기 위해서
        // "finduser"를 입력받아 장바구니 에서 "user"조회
        List<Cart> userList = getByCartUser(user);

        // 장바구니에 해당하는 "user"가 비어있으면 에러 발생!
        if (userList.isEmpty())
            throw new IllegalArgumentException("원하는 결과를 얻으시려면 id : "
                    + id + " 를 제외한 'id' 를 다시 입력해 주세요. ");

        // "user"가 있으면 결과 출력
        return userList;
    }

    // 장바구니 아이템 전체삭제 와 개별삭제 기능
    @Override
    @Transactional
    public String DeleteCart(Long id, Long articleId) {

        // 입력받은 Id로 유저 정보 조회
        User user = memberService.FindById(id);

        // 유저 정보로 장바구니 리스트 조회
        List<Cart> byCartUser = getByCartUser(user);

        // articleId 과 유저 장바구니에 담긴 articleId 이 같으면 해당 상품 삭제
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

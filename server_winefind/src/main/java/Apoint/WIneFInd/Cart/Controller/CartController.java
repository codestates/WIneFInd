package Apoint.WIneFInd.Cart.Controller;


import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "${config.domain}", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // 장바구니 생성
    @PostMapping("cart")
    public ResponseEntity<?> AddCartList(@RequestBody CartDTO cartDTO) {

        try {
            // 입력받은 UserId와 ArticleId로 장바구니 생성 실패시 에러 처리
            Cart createCart = cartService.Save(cartDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("cartInfo", createCart);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 아이템을 장바구니에 '생성’ 할 수 없습니다. \n" + e);
        } catch (IncorrectResultSizeDataAccessException e) {
            return ResponseEntity.status(500).body("장바구니에 동일한 물품이 있습니다. \n" + e);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("장바구니에 user & Article 정보가 존재하지 않습니다. \n" + e);
        } catch (InvalidDataAccessApiUsageException e) {
            return ResponseEntity.status(500).body("'cartDTO' 양식에 맞춰서 다시 기입해 주시기 바랍니다. : " + e);
        }
    }

    // 장바구니 조회
    @GetMapping("cart")
    public ResponseEntity<?> FindCart(@RequestParam Long id) throws MissingServletRequestParameterException {

        try {
            List<Cart> userCartItemList = cartService.FindByUserId(id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("cartInfo", userCartItemList);
            }});
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 Article을 ‘조회’ 할 수 없습니다. \n" + e);
        }
    }

    //장바구니 삭제
    @DeleteMapping("cart/{id}")
    public ResponseEntity<?> DeleteCart(@PathVariable Long id, @RequestParam(required = false) Long articleId) {
        // Id 값만들어오면 해당 유저의 장바구니 아이템 전체 삭제
        // articleId 가 들어오면 선택한 아이템만 삭제
        try {
            String deleteCartItem = cartService.DeleteCart(id, articleId);
            return ResponseEntity.ok().body(deleteCartItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(500).body("해당 장바구니 아이템을 ‘삭제’ 할 수 없습니다. \n" + e);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(500).body("해당 장바구니 아이템을 찾을 수가 없어 '삭제' 할 수 없습니다. \n" + e);
        }

    }

}

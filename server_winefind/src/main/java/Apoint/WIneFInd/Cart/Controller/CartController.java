package Apoint.WIneFInd.Cart.Controller;


import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Service.CartService;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Kakao.Service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("cart")
    public ResponseEntity<?> AddCartList(@RequestBody CartDTO cartDTO) {

        try {
            Cart AddCart = cartService.Save(cartDTO);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("data", new HashMap<>() {{
                    put("Add CartList", AddCart);
                }});
            }});

        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping("cart")
    public ResponseEntity<?> FindCart(@RequestParam Long id) {

        try {
            List<Cart> carts = cartService.FindByConsumerId(id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("data", new HashMap<>() {{
                    put("Show MyCartItem", carts);
                }});
            }});
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}

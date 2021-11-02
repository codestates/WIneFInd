package Apoint.WIneFInd.Cart.Controller;


import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Cart.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("cart")
    public ResponseEntity<?> FindCart(@RequestParam Long id) throws MissingServletRequestParameterException {

        try {
            List<Cart> carts = cartService.FindByConsumerId(id);
            return ResponseEntity.ok().body(new HashMap<>() {{
                put("Show MyCartItem", carts);
            }});
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("장바구니에 해당 'Consumer' 가 존재 하지 않습니다. \n" + e);
        }
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

        } catch (NonUniqueResultException e) {
            return ResponseEntity.status(500).body("장바구니에 동일한 물품이 있습니다. \n" + e);
        } catch (IncorrectResultSizeDataAccessException e) {
            return ResponseEntity.status(500).body("장바구니에 동일한 물품이 있습니다. \n" + e);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(500).body("장바구니에 Consumer & Article 정보가 존재하지 않습니다. \n" + e);
        } catch (InvalidDataAccessApiUsageException e) {
            return ResponseEntity.status(500).body("Domain 양식에 맞지 않습니다 양식에 맞춰 다시보내주세요. \n" + e);
        }
    }

    @DeleteMapping("cart")
    public ResponseEntity<?> DeleteCart(@RequestParam Long id, @RequestParam(required = false) Long artId) {
        cartService.DeleteCart(id, artId);
        return ResponseEntity.ok().body("Delete Success");
    }

}

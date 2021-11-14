package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;

import java.util.List;

public interface CartService {

    // 장바구니 생성
    public Cart Save(CartDTO cartDTO);

    // 유저의 장바구니 조회
    public List<Cart> FindByUserId(Long id);

    // 유저의 장바구니 삭제
    public String DeleteCart(Long id, Long articleId);

}

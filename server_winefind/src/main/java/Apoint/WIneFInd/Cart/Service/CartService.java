package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;

import java.util.List;

public interface CartService {

    public Cart Save(CartDTO cartDTO);

    public List<Cart> FindByUserId(Long id);

    public String DeleteCart(Long id, Long artId);

}

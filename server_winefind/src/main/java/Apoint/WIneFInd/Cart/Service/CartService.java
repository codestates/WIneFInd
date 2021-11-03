package Apoint.WIneFInd.Cart.Service;

import Apoint.WIneFInd.Cart.Domain.CartDTO;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Kakao.Model.Consumer;

import java.util.List;

public interface CartService {
    //as
    public Cart Save(CartDTO cartDTO);

    public List<Cart> FindByConsumerId(Long id);

    public void DeleteCart(Long id, Long artId);

}

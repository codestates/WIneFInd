package Apoint.WIneFInd.Cart.Repository;

import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Member.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(User user);

}


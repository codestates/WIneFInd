package Apoint.WIneFInd.Cart.Repository;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
//ahah

    List<Cart> findByConsumer(Consumer consumer);

}


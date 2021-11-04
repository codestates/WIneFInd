package Apoint.WIneFInd.Cart.Model;


import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Member.Model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_article_cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;


    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

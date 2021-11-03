package Apoint.WIneFInd.Cart.Model;


import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Kakao.Model.Consumer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "article_consumer_cart")
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
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;
}

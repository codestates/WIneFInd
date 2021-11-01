package Apoint.WIneFInd.Cart.Model;


import Apoint.WIneFInd.Article.Model.Article;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;
}

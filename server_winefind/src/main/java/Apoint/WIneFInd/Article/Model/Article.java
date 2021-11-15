package Apoint.WIneFInd.Article.Model;

import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "wine_id")
    private Wine wine;

    @JsonBackReference
    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Cart> cartList;

    @JsonBackReference
    @Builder.Default
    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private List<Recommended> recommendedList = new ArrayList<>();
}
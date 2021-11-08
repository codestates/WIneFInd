package Apoint.WIneFInd.Member.Model;

import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Recommended.Model.Recommended;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column
    private String image;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType role; // ROLE_USER, ROLE_ADMIN, ROLE_KAKAO

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonBackReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Article> articleList;

    @JsonBackReference
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Cart> cartList = new ArrayList<>();

    @JsonBackReference
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Recommended> recommendedList = new ArrayList<>();
}
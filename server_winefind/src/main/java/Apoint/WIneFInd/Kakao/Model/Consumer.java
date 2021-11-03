package Apoint.WIneFInd.Kakao.Model;

import Apoint.WIneFInd.Cart.Model.Cart;
import Apoint.WIneFInd.Recommend.Model.Recommend;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Consumer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonBackReference
    @OneToMany(mappedBy = "consumer", cascade = CascadeType.REMOVE)
    private List<Cart> cartList = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "consumer", cascade = CascadeType.REMOVE)
    private List<Recommend> recommendList = new ArrayList<>();
}
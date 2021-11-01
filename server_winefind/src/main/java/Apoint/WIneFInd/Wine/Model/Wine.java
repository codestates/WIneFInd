package Apoint.WIneFInd.Wine.Model;

import Apoint.WIneFInd.Article.Model.Article;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String wineName;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String grape;
    @Column(nullable = false)
    private String vintage;
    @Column(nullable = false)
    private String sweet;
    @Column(nullable = false)
    private String acidity;
    @Column(nullable = false)
    private String body;
    @Column(nullable = false)
    private String tannic;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private String comment;
    @Column(nullable = false)
    private String price;

    @JsonManagedReference
    @OneToMany(mappedBy = "wine", cascade = CascadeType.REMOVE)
    private List<Article> articleList;
}
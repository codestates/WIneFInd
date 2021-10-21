package Apoint.WIneFInd.Model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String comment;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private Boolean recommended;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

}

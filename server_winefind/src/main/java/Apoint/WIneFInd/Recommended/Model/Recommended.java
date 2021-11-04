package Apoint.WIneFInd.Recommended.Model;

import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_wine_recommended")
public class Recommended {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "wine_id")
    private Wine wine;


}

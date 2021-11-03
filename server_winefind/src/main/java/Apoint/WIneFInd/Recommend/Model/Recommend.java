package Apoint.WIneFInd.Recommend.Model;

import Apoint.WIneFInd.Kakao.Model.Consumer;
import Apoint.WIneFInd.Wine.Model.Wine;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "wine_consumer_recommend")
public class Recommend {

    //ahah
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "wine_id")
    private Wine wine;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;
}

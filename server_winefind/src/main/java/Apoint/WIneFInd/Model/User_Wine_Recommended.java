package Apoint.WIneFInd.Model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User_Wine_Recommended {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wines_id")
    private Wines wines;
}





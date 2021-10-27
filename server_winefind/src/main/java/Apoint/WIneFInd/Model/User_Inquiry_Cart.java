package Apoint.WIneFInd.Model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User_Inquiry_Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "inquiry_id")
    private Inquiry inquiry;
}

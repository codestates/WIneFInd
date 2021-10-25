package Apoint.WIneFInd.Model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Wines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
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

}

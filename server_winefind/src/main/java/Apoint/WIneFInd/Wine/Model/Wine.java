package Apoint.WIneFInd.Wine.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
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

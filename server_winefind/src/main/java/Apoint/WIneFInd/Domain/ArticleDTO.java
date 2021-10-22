package Apoint.WIneFInd.Domain;

import Apoint.WIneFInd.Model.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ArticleDTO {

    private String title;
    private String comment;
    private String image;
    private Boolean recommended;
    private Users users;
    
}

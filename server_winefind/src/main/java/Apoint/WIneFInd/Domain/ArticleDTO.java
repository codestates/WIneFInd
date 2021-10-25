package Apoint.WIneFInd.Domain;

import Apoint.WIneFInd.Model.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ArticleDTO {

    private long userId;
    private String title;
    private String image;
    private String comment;


    
}

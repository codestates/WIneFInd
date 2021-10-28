package Apoint.WIneFInd.Article.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDTO {

    private Long userId;
    private Long wineId;
    private String title;
    private String comment;

}

package Apoint.WIneFInd.Article.Domain;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ArticleDTO {
//asdf
//asdfaa

    private Long userId;
    private Long wineId;
    private String title;
    private String comment;
    private List<WineDTO> wines;

}
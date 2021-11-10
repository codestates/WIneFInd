package Apoint.WIneFInd.Article.Domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ArticleFilterDTO {

    private List<String> typesList;
    private List<String> countriesList;
    private List<String> sweetnessList;
    private List<String> acidityList;
    private List<String> bodyList;
    private List<String> tannicList;
    private List<String> priceList;

}

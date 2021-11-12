package Apoint.WIneFInd.Article.Domain;

import Apoint.WIneFInd.Wine.Domain.WineDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ArticleDTO {

    private Long userId;
    private String title;
    private String content;
    private List<WineDTO> wines; // 판매글을 만들때 와인도 함깨 만들기 위해서
}
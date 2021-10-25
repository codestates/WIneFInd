package Apoint.WIneFInd.Service;


import Apoint.WIneFInd.Domain.ArticleDTO;
import Apoint.WIneFInd.Model.Article;
import Apoint.WIneFInd.Repository.ArticleRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article CreateArticle(ArticleDTO articleDTO) {
        for (Article i : articleRepository.findAll()) {
            if (i.getTitle().equals(articleDTO.getTitle()) && i.getComment().equals(articleDTO.getComment()) &&
                    i.getImage().equals(articleDTO.getImage())) {
                return null;
            }
        }
        articleRepository.Create(articleDTO);
        return articleRepository.findById(articleDTO.getUserId());
    }

    public List<Article> FindByAll(){
        return articleRepository.findAll();
    }

    public List<Article> FindByUserId(long id){
        return articleRepository.findByUserId(id);
    }

    public void UpdateArticle(Article article){
        articleRepository.Update(article);
    }

    public void DeleteArticle(long id){
        articleRepository.Delete(id);
    }
}

package Apoint.WIneFInd.Article.Service;

import Apoint.WIneFInd.Article.Domain.ArticleDTO;
import Apoint.WIneFInd.Article.Model.Article;
import Apoint.WIneFInd.Article.Repository.ArticleRepository;
import Apoint.WIneFInd.Member.Model.User;
import Apoint.WIneFInd.Member.Repository.MemberRepository;
import Apoint.WIneFInd.Wine.Model.Wine;
import Apoint.WIneFInd.Wine.Repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {
//asdf

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final WineRepository wineRepository;

    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository, MemberRepository memberRepository, WineRepository wineRepository) {
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
        this.wineRepository = wineRepository;
    }

    @Override
    public Article Save(ArticleDTO articleDTO) {

        List<Article> checkTitle = articleRepository.findByTitle(articleDTO.getTitle());

        if (!checkTitle.isEmpty()) {

            throw new NullPointerException("동일한 아이디가 존재 합니다~");
        }

        Article article = new Article();
        User user = memberRepository.findById(articleDTO.getUserId()).get();
        Wine wine = wineRepository.findById(articleDTO.getWineId()).get();

        article.setTitle(articleDTO.getTitle());
        article.setComment(articleDTO.getComment());
        article.setUser(user);
        article.setWine(wine);

        return articleRepository.save(article);
    }

    @Override
    public List<Article> FindByAll() {

        return articleRepository.findAll();
    }

    @Override

    public Page<Article> FindByAllPage(Pageable pageable) {

        return articleRepository.findAll(pageable);
    }

    
    @Override
    public Page<Article> FindByTitleContainingOrCommentContaining(String text, String content, Pageable pageable) {

        return articleRepository.findByTitleContainingOrCommentContaining(text, content, pageable);
    }

    @Override
    public Optional<Article> FindById(Long id) {

        return articleRepository.findById(id);
    }

    @Override
    public Article Update(Article article) {

        Article updateArticle = articleRepository.findById(article.getId()).get();

        updateArticle.setTitle(article.getTitle());
        updateArticle.setComment(article.getComment());

        return articleRepository.save(updateArticle);
    }

    @Override
    public List<Article> Delete(Long id) {

        articleRepository.deleteById(id);

        return articleRepository.findAll();
    }
}
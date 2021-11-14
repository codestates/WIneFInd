import styles from '../styles/Article.module.css';
import { Flag, Label } from 'semantic-ui-react';
import router from 'next/router';

const Article = ({ articles }) => {
  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };

  return (
    <>
      {articles.map((article, index) => (
        <div
          className={styles.article_container}
          onClick={() => goToDescription(article.id)}
          key={index}
        >
          <div className={styles.article_box}>
            <div
              style={{
                padding: '10px',
                backgroundImage: `url(${article.wine.image})`,
              }}
              className={styles.wine_image}
            ></div>
            <div className={styles.wine_info}>
              <div className={styles.wineName}>{article.wine.wineName}</div>
              <div>{article.wine.grape}</div>
              <div>
                <Flag name={article.wine.country.toLowerCase()} />
                {article.wine.country}
              </div>

              <div className={styles.typeAndPrice}>
                {article.wine.type === 'red' ? (
                  <Label color='red'>Red</Label>
                ) : article.wine.type === 'white' ? (
                  <Label color='blue'>White</Label>
                ) : article.wine.type === 'sparkling' ? (
                  <Label color='yellow'>Sparkling</Label>
                ) : (
                  <Label style={{ backgroundColor: 'rgb(248, 184, 195)' }}>
                    Rose
                  </Label>
                )}
                <div style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>
                  {article.wine.price}원 ({article.wine.vintage},750ml)
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Article;

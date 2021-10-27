import { useEffect } from 'react';
import styles from '../styles/Article.module.css';
const Article = ({ articles }) => {
  //users_id ==판매자 아이디
  //id == 게시글 아이디
  //wine id == 와인 아이디
  // const { id, users_id, wine_id, title, comment, image } = article;

  return (
    <>
      {articles.map((article, index) => (
        <div className={styles.article_container} key={index}>
          <div className={styles.article_box}>
            <img className={styles.wine_image} src={article.image} />
            <div className={styles.wine_info}>
              <div>와인명 : {article.wine.wineName}</div>
              <div>종류 : 레드와인</div>
              <div>국가 : 칠레</div>
              {article.price}
              <div>가격 : 130,000 원</div>
              <div>작성자 : {article.user.email}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Article;

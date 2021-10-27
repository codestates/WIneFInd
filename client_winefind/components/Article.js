import { useEffect } from 'react';
import styles from '../styles/Article.module.css';
import router, { withRouter } from 'next/router';
const Article = ({ articles }) => {
  //users_id ==판매자 아이디
  //id == 게시글 아이디
  //wine id == 와인 아이디
  // const { id, users_id, wine_id, title, comment, image } = article;
  const goToDescription = (ele) => {
    // console.log(ele);
    router.push(`/mall/${ele}`);
  };
  return (
    <>
      {articles.map((article, index) => (
        <div className={styles.article_container} key={index}>
          <div className={styles.article_box}>
            <img className={styles.wine_image} src={article.wine.image} />
            <div className={styles.wine_info}>
              <div>와인명 : {article.wine.wineName}</div>
              <div>종류 : {article.wine.type}</div>
              <div>국가 :{article.wine.country}</div>
              <div>가격 : {article.wine.price}</div>
              <div>작성자 : {article.user.email}</div>
              <button onClick={() => goToDescription(article.id)}>
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Article;

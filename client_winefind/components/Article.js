import styles from '../styles/Article.module.css';
import { Button, Icon } from 'semantic-ui-react';
import router from 'next/router';
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
            <div
              style={{ backgroundImage: `url(${article.wine.image})` }}
              className={styles.wine_image}
            ></div>
            {/* <img className={styles.wine_image} src={article.wine.image} /> */}
            <div className={styles.wine_info}>
              <div>와인명 : {article.wine.wineName}</div>
              <div>종류 : {article.wine.type}</div>
              <div>국가 :{article.wine.country}</div>
              <div>가격 : {article.wine.price}</div>
              <div>작성자 : {article.user.email}</div>
              <div className={styles.article_findmore}>
                <Button onClick={() => goToDescription(article.id)} animated>
                  <Button.Content visible>더 보기</Button.Content>
                  <Button.Content hidden>
                    <Icon name='search plus' />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Article;

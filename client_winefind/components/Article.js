import styles from '../styles/Article.module.css';
import { Flag, Label } from 'semantic-ui-react';
import router from 'next/router';
import { style } from 'dom-helpers';
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
                {console.log('wine data:', article)}
                {article.wine.country}
              </div>

              {/* <div>작성자 : {article.user.email}</div> */}
              <div className={styles.typeAndPrice}>
                {article.wine.type === 'red' ? (
                  <Label
                    as='a'
                    color='red'
                    // style={{ backgroundColor: '#cda581' }}
                  >
                    Red
                  </Label>
                ) : article.wine.type === 'white' ? (
                  <Label
                    as='a'
                    color='blue'
                    // style={{ backgroundColor: '#cda581' }}
                  >
                    White
                  </Label>
                ) : article.wine.type === 'sparkling' ? (
                  <Label
                    as='a'
                    color='yellow'
                    // style={{ backgroundColor: '#cda581' }}
                  >
                    Sparkling
                  </Label>
                ) : (
                  <Label
                    as='a'
                    // color='pink'
                    style={{ backgroundColor: 'rgb(248, 184, 195)' }}
                  >
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

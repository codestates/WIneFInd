import React from 'react';
import styles from '../styles/Article.module.css';

export default function ArticleCart({
  item,
  checkedItems,
  handleCheckChange,
  handleDelete,
  articles,
}) {
  return (
    <li className='cart-item-body'>
      {articles.map((article, index) => (
        <div className={styles.article_container}>
          <div className={styles.article_box}>
            <img className={styles.wine_image} src={article.wine.image} />
            <div className={styles.wine_info}>
              <input
                type='checkbox'
                className='cart-item-checkbox'
                onChange={(e) => {
                  handleCheckChange(e.target.checked, item.id);
                }}
                checked={checkedItems.includes(item.id) ? true : false}
              ></input>
              <div>와인명 : {article.wine.wineName}</div>
              <div>종류 : {article.wine.type}</div>
              <div>국가 :{article.wine.country}</div>
              <div>가격 : {article.wine.price}</div>
              <div>작성자 : {article.user.email}</div>
              <button onClick={() => goToDescription(article.id)}>
                자세히 보기
              </button>
              <button
                className='cart-item-delete'
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </li>
  );
}

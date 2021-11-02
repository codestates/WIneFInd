import React from 'react';
import styles from '../styles/Article.module.css';
import router from 'next/router';
export default function ArticleCart({
  item,
  checkedItems,
  handleCheckChange,
  handleDelete,
}) {
  const goToDescription = (ele) => {
    // console.log(ele);
    router.push(`/mall/${ele}`);
  };
  return (
    <li className='cart-item-body'>
      <div className={styles.article_container}>
        <div className={styles.article_box}>
          <img className={styles.wine_image} src={item.wine.image} />
          <div className={styles.wine_info}>
            <input
              type='checkbox'
              className='cart-item-checkbox'
              onChange={(e) => {
                handleCheckChange(e.target.checked, item.id);
              }}
              checked={checkedItems.includes(item.id) ? true : false}
            ></input>
            <div>와인명 : {item.wine.wineName}</div>
            <div>종류 : {item.wine.type}</div>
            <div>국가 :{item.wine.country}</div>
            <div>가격 : {item.wine.price}</div>
            <div>작성자 : {item.user.email}</div>
            <button onClick={() => goToDescription(item.id)}>
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
    </li>
  );
}

import React from 'react';
import styles from '../../styles/Articlecart.module.css';
import router from 'next/router';
import { Flag, Label } from 'semantic-ui-react';
export default function ArticleCart({
  item,
  checkedItems,
  handleCheckChange,
  handleDelete,
}) {
  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };
  return (
    <div className={styles.article_box}>
      <input
        type='checkbox'
        onChange={(e) => {
          handleCheckChange(e.target.checked, item.id);
        }}
        checked={
          // [1,7 통째로]
          checkedItems.map((el) => el.id).includes(item.id) ? true : false
        }
      ></input>
      <div
        style={{
          padding: '10px',
          backgroundImage: `url(${item.wine.image})`,
        }}
        className={styles.wine_image}
        onClick={() => goToDescription(item.id)}
      ></div>
      <div className={styles.wine_info}>
        <div style={{ display: 'flex' }}>
          <div className={styles.wineName}>{item.wine.wineName}</div>
          <button
            className={styles.minus_btn}
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            <img style={{ width: '20px' }} src='images/minus.png' />
          </button>
        </div>
        <div>{item.wine.grape}</div>
        <div>
          <Flag name={item.wine.country.toLowerCase()} />
          {item.wine.country}
        </div>

        <div className={styles.typeAndPrice}>
          {item.wine.type === 'red' ? (
            <Label color='red'>Red</Label>
          ) : item.wine.type === 'white' ? (
            <Label color='blue'>White</Label>
          ) : item.wine.type === 'sparkling' ? (
            <Label color='yellow'>Sparkling</Label>
          ) : (
            <Label style={{ backgroundColor: 'rgb(248, 184, 195)' }}>
              Rose
            </Label>
          )}
          <div
            style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              fontSize: '1.2rem',
              zIndex: '1000',
            }}
          >
            {item.wine.price}원 ({item.wine.vintage},750ml)
          </div>
        </div>
      </div>
    </div>
  );
}

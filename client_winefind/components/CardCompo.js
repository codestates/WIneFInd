import styles from '../styles/Home.module.css';
import React, { useEffect, useState, useRef } from 'react';
import router from 'next/router';

const CardCompo = ({ compo }) => {
  const goToDescription = (ele) => {
    // console.log(ele);
    router.push(`/mall/${ele}`);
  };

  return (
    <>
      {/* {console.log('i work', compo[0].wine)} */}
      {compo.map((article, index) => (
        <div
          className={styles.card_height}
          key={index}
          onClick={() => goToDescription(article.id)}
        >
          <div className={styles.card_head}>
            <h2 className='logo text'>{article.wine.wineName}</h2>
          </div>
          <img src={article.wine.image} className={styles.image_height} />
          <img className={styles.bord} src='/images/border.png' />
        </div>
      ))}
    </>
  );
};

export default CardCompo;

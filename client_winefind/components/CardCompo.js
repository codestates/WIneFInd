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
      {/* {console.log('i work', compo[0].wine.wineName)} */}
      {/* <div
        className={styles.card_height}
        onClick={() => goToDescription(compo[0].id)}
      >
        <div className={styles.card_head}>
          <h3 className='logo text'>{compo[0].wine.wineName}</h3>
        </div>
        <img src={compo[0].wine.image} className={styles.image_height} />
      </div> */}
    </>
  );
};

export default CardCompo;

import React from 'react';
import styles from '../../styles/Shoppinglist.module.css';

export default function OrderTotal({ totalQty, total, checkedItems }) {
  return (
    // 총 합 알려주는 창
    <div style={{ marginTop: '30px' }}>
      <h2 className='text_eng'>Bill</h2>
      <div style={{ lineHeight: '40px' }}>
        <hr></hr>
        {checkedItems.map((item) => item.wineName)}총 개수:
        <span>{totalQty} 개</span>
        <div>
          합계 : <span>{total()} 원</span>
        </div>
        <div className={styles.kakaopay}>
          <img src='images/kakaopay.jpeg' style={{ width: '50px' }} /> 결제하기
        </div>
      </div>
    </div>
  );
}

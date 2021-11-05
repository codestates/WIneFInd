import React from 'react';

export default function OrderTotal({ totalQty, total }) {
  return (
    // 총 합 알려주는 창
    <div id='order-summary-container'>
      <h2>주문 합계</h2>
      <div id='order-summary'>
        총 아이템 개수 :{' '}
        <span className='order-summary-text'>{totalQty} 개</span>
        <hr></hr>
        <div id='order-summary-total'>
          합계 : <span className='order-summary-text'>{total()} 원</span>
        </div>
      </div>
    </div>
  );
}

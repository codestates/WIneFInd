import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../styles/Shoppinglist.module.css';

export default function OrderTotal({
  totalQty,
  total,
  checkedItems,
  userInfo,
}) {
  const [orderId, setOrderId] = useState(200003);
  const UUID = Math.random().toString(36).substr(2, 11);
  const purchaseItem = () => {
    let name = checkedItems[0].title + '-' + checkedItems[0].wine.wineName;
    if (checkedItems.length > 1) {
      name += ` (외 ${checkedItems.length - 1}건 주문)`;
    }
    let price = total();
    let tax = total() * 0.1;
    console.log('price', typeof price);
    if (price >= 1000000) {
      alert('카카오페이 테스트 결제는 100만원을 초과할 수 없습니다.');
    } else {
      alert('카카오페이 테스트 결제를 진행합니다.');
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/kakaopay`,
          {
            orderId: UUID,
            userId: userInfo.id.toString(),
            itemName: name,
            quantity: totalQty.toString(),
            totalAmount: price.toString(),
            tax: tax.toString(),
          },
          { withCredentials: true }
        )
        .then((res) => {
          window.location.href = `${res.data}`;
          // setOrderId(orderId + 1);
        })
        .catch((e) => {
          console.log('error!', e);
        });
    }
  };
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
        <div className={styles.kakaopay} onClick={purchaseItem}>
          <img src='images/kakaopay.jpeg' style={{ width: '50px' }} />
          결제하기
        </div>
      </div>
    </div>
  );
}

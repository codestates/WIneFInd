import React, { useEffect, useState } from 'react';
import styles from '../styles/Success.module.css';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import classNames from 'classnames';
import Mall from './mall';
import Sidebar from '../components/Sidebar';

const Success = () => {
  const [billData, setBillData] = useState(null);
  const getBillData = () => {
    const token = window.location.href.split('=')[1];
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/kakao/success?pg_token=${token}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBillData(res.data);
      })
      .catch((e) => {
        console.log('error:', e);
      });
  };
  useEffect(() => {
    getBillData();
  }, []);
  return (
    <>
      <Sidebar />
      <div className={styles.resign_container}>
        <div className={styles.bill_box}>
          <div className={classNames('text_font', styles.bill_container)}>
            <div style={{ borderBottom: '2px solid #cda581' }}>결제 정보</div>
            <div className={styles.bill_content}>
              <div>상품명: {billData ? billData.item_name : ''}</div>
              <div>결제일시: {billData ? billData.created_at : ''}</div>
              <div>결제금액: {billData ? billData.amount.total : ''}₩</div>
              <div>결제수단: 카카오페이 머니</div>
              <br />
              <div style={{ color: '#cda581' }}>
                저희 서비스를 이용해 주셔서 감사합니다.
              </div>
            </div>
          </div>
          <img src='images/loading.gif' style={{ width: '550px' }} />
        </div>
      </div>
    </>
  );
};

export default Success;

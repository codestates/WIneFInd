import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/dist/client/router';
import React, { useState, useEffect } from 'react';
import styles from '../styles/User.module.css';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
//마이페이지
const Resign = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const resignAccount = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        let id = 0;

        if (res.data.message == '카카오 회원 로그인 되었습니다') {
          id = res.data['카카오 정보'].id;
          console.log(id);
        }
        // else {
        //   id = res.data['유저 정보'].id;
        // }
        // console.log('id:', id);
        // axios
        //   .delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        //     console.log('done!:', res);
        //     window.location.reload();
        //   })
        //   .catch((e) => {
        //     console.log('err:', e);
        //   });
      })
      .catch((e) => {
        console.log('not login:', e);
      });
  };

  return (
    <>
      <div className={styles.resign_container}>
        <Sidebar />
        <div className={styles.resign_layout}>
          <h2 style={{ color: 'red', fontWeight: 'bold' }}>
            <Icon name='warning sign' size='huge' />
            Warning!!
          </h2>{' '}
          <br />
          <h2 className='logo text' style={{ fontWeight: 'bold' }}>
            All of your INFORMATION will be DELETED!!
            <br /> You will NOT be able to RE-DO this Action.
          </h2>
          <button onClick={toggleModal} className={styles.btn}>
            Resign from App
          </button>
        </div>
      </div>
      {modal && (
        <div className={styles.resign}>
          <div onClick={toggleModal} className={styles.resign_overlay}></div>
          <div className={styles.resign_contents}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <h2
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                Are you Sure you want to Delete this Account?
              </h2>
              <img
                style={{
                  width: '120px',
                }}
                src='/images/logo.png'
              />
            </div>
            <div
              onClick={resignAccount}
              style={{
                display: 'flex',
                fontWeight: 'bold',
                color: 'blue',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              <button className={styles.btn}>Delete Account</button>
            </div>

            <p
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              Copyright ⓒ 2021. Apoint. All rights reserved.
            </p>
            <Icon
              name='window close'
              className={styles.close_modal}
              onClick={toggleModal}
            />
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Resign;

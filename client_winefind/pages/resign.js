import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import styles from '../styles/User.module.css';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import classNames from 'classnames';
//마이페이지 회원 탈퇴 페이지
const Resign = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  //회원 탈퇴 API
  const resignAccount = () => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        let id = res.data.userInfo.id;
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            //배포할때
            window.location.replace(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
          })
          .catch((e) => {
            console.log('err:', e);
          });
      })
      .catch((e) => {
        console.log('not login:', e);
      });
  };

  return (
    <>
      <div className={styles.resign_container}>
        <Sidebar />
        {/* 회원 탈퇴 하기 */}
        <div className={styles.resign_layout}>
          <h2 style={{ color: 'red', fontWeight: 'bold' }}>
            <Icon name='warning sign' size='huge' />
            Warning!!
          </h2>{' '}
          <br />
          <h2 className='logo text_color' style={{ fontWeight: 'bold' }}>
            모든 정보가 삭제됩니다.
            <br /> 삭제 후 되돌릴 수 없습니다.
          </h2>
          <button onClick={toggleModal} className={styles.btn}>
            탈퇴하기
          </button>
        </div>
      </div>
      {/* 탈퇴 하시겠어요 모달 띄어주는 기능 */}
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
                정말로 탈퇴하시겠습니까?
              </h2>
              <div
                className={classNames(
                  styles.logo_title,
                  'text_color',
                  'text_eng'
                )}
              >
                WINE FIND
              </div>
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

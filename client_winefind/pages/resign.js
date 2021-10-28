import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/dist/client/router';
import React, { useState, useEffect } from 'react';
import styles from '../styles/User.module.css';
import { Icon } from 'semantic-ui-react';
//마이페이지
const Resign = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal === true) {
  //   useEffect(() => {
  //     document.body.style.overflowY = 'hidden';
  //   });
  // } else {
  //   useEffect(() => {
  //     document.body.style.overflowY = 'scroll';
  //   });
  // }

  function goLink() {
    router.push('/index');
  }

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
              onClick={goLink}
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

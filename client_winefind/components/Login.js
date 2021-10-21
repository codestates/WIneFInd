import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { Icon, Button } from 'semantic-ui-react';

const Login = () => {
  const [modal, setModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeLogin = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  // if (modal) {
  //   document.body.classList.add('active-modal');
  // } else {
  //   document.body.classList.remove('active-modal');
  // }

  return (
    <>
      <button onClick={toggleModal} className={styles.btn_modal}>
        Login
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          {isLogin ? (
            <div className={styles.modal_contents}>
              <div>
                <h2 style={{ display: 'flex', marginLeft: '11.5rem' }}>
                  Sign In
                </h2>
                <img
                  style={{
                    display: 'flex',
                    marginLeft: '10rem',
                    width: '100px',
                  }}
                  src='/images/logo.png'
                />
              </div>
              <div>
                <img
                  src='/images/user.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='text'
                  placeholder='Email'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
                <img
                  src='/images/lock.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='password'
                  placeholder='Password'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
              </div>

              <div
                onClick={changeLogin}
                style={{
                  display: 'flex',
                  fontWeight: 'bold',
                  color: 'blue',
                  cursor: 'pointer',
                  marginLeft: '5.3rem',
                  marginBottom: '5px',
                }}
              >
                <Button color='purple'>Log In</Button>
                <Button color='violet'>Create an Account</Button>
              </div>

              <p style={{ display: 'flex', marginLeft: '5rem' }}>
                Copyright ⓒ 2021. Apoint. All rights reserved.
              </p>

              <Icon
                name='window close'
                className={styles.close_modal}
                onClick={toggleModal}
              />
            </div>
          ) : (
            <div className={styles.modal_contents}>
              <div>
                <h2 style={{ display: 'flex', marginLeft: '11.5rem' }}>
                  Sign Up
                </h2>
                <img
                  style={{
                    display: 'flex',
                    marginLeft: '10rem',
                    width: '100px',
                  }}
                  src='/images/logo.png'
                />
              </div>
              <div>
                <img
                  src='/images/email.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='text'
                  placeholder='Email'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
                <img
                  src='/images/user.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='text'
                  placeholder='Username'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
                <img
                  src='/images/lock.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='password'
                  placeholder='Password'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
                <img
                  src='/images/checklock.png'
                  height='30px'
                  width='30px'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    marginLeft: '5rem',
                  }}
                />
                <input
                  type='password'
                  placeholder='Check Password'
                  style={{
                    display: 'flex',
                    margin: '1rem 7.5rem',
                    width: '15rem',
                    height: '2rem',
                    border: 'none',
                  }}
                />
              </div>
              <div
                onClick={changeLogin}
                style={{
                  display: 'flex',
                  fontWeight: 'bold',
                  color: 'blue',
                  cursor: 'pointer',
                  marginLeft: '9rem',
                  marginBottom: '5px',
                }}
              >
                <Button color='purple'>Create Account</Button>
              </div>

              <p style={{ display: 'flex', marginLeft: '5rem' }}>
                Copyright ⓒ 2021. Apoint. All rights reserved.
              </p>

              <Icon
                name='window close'
                className={styles.close_modal}
                onClick={toggleModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;

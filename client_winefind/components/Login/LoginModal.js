import React, { useState } from 'react';

import styles from '../../styles/Login.module.css';
import classNames from 'classnames';
import Login from './Login';
import Signup from './Signup';

const LoginModal = ({ toggleModal, modal }) => {
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(true);
  const changeLoginToSignup = () => {
    if (isLoginOrSignup) {
      setIsLoginOrSignup(() => false);
    } else {
      setIsLoginOrSignup(() => true);
    }
  };
  function enterkey(func) {
    if (window.event.keyCode == 13) {
      func();
    }
  }
  return (
    <>
      <a
        className={classNames('text_color', 'text_font', styles.nav_btn)}
        name='login'
        onClick={toggleModal}
        style={{ alignSelf: 'center' }}
      >
        로그인
      </a>
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          {isLoginOrSignup ? (
            <Login
              changeLoginToSignup={changeLoginToSignup}
              toggleModal={toggleModal}
              enterkey={enterkey}
            />
          ) : (
            <Signup
              changeLoginToSignup={changeLoginToSignup}
              toggleModal={toggleModal}
              enterkey={enterkey}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LoginModal;

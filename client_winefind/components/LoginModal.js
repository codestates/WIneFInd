import React, { useState, useEffect } from "react";

import styles from "../styles/Login.module.css";

import Login from "./Login";
import Signup from "./Signup";

const LoginModal = ({ toggleModal, modal }) => {
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(true);
  const changeLoginToSignup = () => {
    if (isLoginOrSignup) {
      setIsLoginOrSignup(() => false);
    } else {
      setIsLoginOrSignup(() => true);
    }
  };
  return (
    <>
      <button className={styles.btn} name="login" onClick={toggleModal}>
        Login
      </button>
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          {isLoginOrSignup ? (
            <Login
              changeLoginToSignup={changeLoginToSignup}
              toggleModal={toggleModal}
            />
          ) : (
            <Signup
              changeLoginToSignup={changeLoginToSignup}
              toggleModal={toggleModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LoginModal;

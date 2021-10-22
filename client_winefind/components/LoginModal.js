import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Icon, Button } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

const LoginModal = () => {
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

  //scroll 방지 함수
  if (modal === true) {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
    });
  } else {
    useEffect(() => {
      document.body.style.overflowY = "scroll";
    });
  }

  return (
    <>
      <button onClick={toggleModal} className={styles.btn_modal}>
        Login
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          {isLogin ? (
            <Login changeLogin={changeLogin} toggleModal={toggleModal} />
          ) : (
            <Signup changeLogin={changeLogin} toggleModal={toggleModal} />
          )}
        </div>
      )}
    </>
  );
};

export default LoginModal;

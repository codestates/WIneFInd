import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Icon, Button } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

const LoginModalForm = ({
  toggleModal,
  changeLoginToSignup,
  modal,
  isLoginOrSignup,
}) => {
  return (
    <>
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

export default LoginModalForm;

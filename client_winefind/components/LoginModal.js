import React, { useState, useEffect } from "react";
import LoginModalForm from "./LoginModalForm";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeLoginToSignup = () => {
    if (isLoginOrSignup) {
      setIsLoginOrSignup(() => false);
    } else {
      setIsLoginOrSignup(() => true);
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
      <p onClick={toggleModal} style={{ fontWeight: "bold" }}>
        Login
      </p>
      <LoginModalForm
        isLoginOrSignup={isLoginOrSignup}
        modal={modal}
        toggleModal={toggleModal}
        changeLoginToSignup={changeLoginToSignup}
      />
    </>
  );
};

export default LoginModal;

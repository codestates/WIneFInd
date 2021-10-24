import styles from "../styles/Home.module.css";
import { Icon, Button } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Signup = ({ toggleModal, changeLoginToSignup }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });
  const [isEmailOk, setIsEmailOk] = useState(null);
  const [isPasswordOk, setIsPasswordOk] = useState(null);
  const [isCheckPasswordOk, setIsCheckPasswordOk] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    if (signUpInfo.email !== "") {
      if (regExp_Email.test(signUpInfo.email) === false) {
        setIsEmailOk(false);
        console.log("false");
      } else {
        setIsEmailOk(true);
        console.log("true");
      }
    }

    if (signUpInfo.password !== "") {
      if (regExp_Password.test(signUpInfo.password) === false) {
        setIsPasswordOk(false);
        console.log("false");
      } else {
        setIsPasswordOk(true);
        console.log("true");
      }
    }

    if (signUpInfo.checkPassword !== "") {
      if (signUpInfo.checkPassword === signUpInfo.password) {
        setIsCheckPasswordOk(true);
      } else {
        setIsCheckPasswordOk(false);
      }
    }
  };

  const createAccount = () => {
    if (
      signUpInfo.email === "" ||
      signUpInfo.nickname === "" ||
      signUpInfo.password === "" ||
      signUpInfo.checkPassword === ""
    ) {
      setErrorMessage("모든 항목을 기입해주세요!");
      return null;
    } else if (signUpInfo.password !== signUpInfo.checkPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return null;
    } else if (!(isEmailOk && isPasswordOk)) {
      setErrorMessage("유효한 값을 입력해주세요");
      return null;
    } else {
      axios
        .post(
          "https://localhost:4000/signup",
          {
            email: signUpInfo.email,
            nickname: signUpInfo.nickname,
            password: signUpInfo.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          console.log("signup Success!");
        });
    }
  };

  let regExp_Email =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  let regExp_Password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

  return (
    <div className={styles.modal_contents}>
      <div className={styles.signup_container}>
        <div>
          <h2>Sign Up</h2>
          <img
            style={{
              display: "flex",
              marginLeft: "-1rem",
              width: "100px",
            }}
            src="/images/logo.png"
          />
        </div>
        <div className={styles.form_container}>
          <div className={styles.form}>
            <img src="/images/email.png" height="30px" width="30px" />
            <input
              type="text"
              value={signUpInfo.email}
              placeholder="Email"
              onChange={handleInputValue("email")}
            />
            {isEmailOk === null ? (
              <div></div>
            ) : isEmailOk ? (
              <img width="20px" src="images/ok.png"></img>
            ) : (
              <img width="20px" src="images/notok.png"></img>
            )}
          </div>
          <div className={styles.form}>
            <img src="/images/user.png" height="30px" width="30px" />
            <input
              value={signUpInfo.nickname}
              type="text"
              placeholder="UserName"
              onChange={handleInputValue("nickname")}
            />
          </div>
          <div className={styles.form}>
            <img src="/images/lock.png" height="30px" width="30px" />
            <input
              value={signUpInfo.password}
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
            />
            {isPasswordOk === null ? (
              <div></div>
            ) : isPasswordOk ? (
              <img width="20px" src="images/ok.png"></img>
            ) : (
              <img width="20px" src="images/notok.png"></img>
            )}
          </div>
          <div className={styles.form}>
            <img src="/images/checklock.png" height="30px" width="30px" />
            <input
              type="password"
              value={signUpInfo.checkPassword}
              placeholder="Check Password"
              onChange={handleInputValue("checkPassword")}
            />
          </div>
        </div>
        <div className={styles.form}>{errorMessage}</div>
        <div className={styles.button}>
          <Button color="purple" onClick={createAccount}>
            Create Account
          </Button>
          <div style={{ marginTop: "0.7rem" }}>
            <Button color="violet" onClick={changeLoginToSignup}>
              Go to Login
            </Button>
          </div>
        </div>

        <p>Copyright ⓒ 2021. Apoint. All rights reserved.</p>
      </div>

      <Icon
        name="window close"
        className={styles.close_modal}
        onClick={toggleModal}
      />
    </div>
  );
};

export default Signup;

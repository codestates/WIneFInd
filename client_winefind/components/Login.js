import styles from "../styles/Login.module.css";
import React, { useState, useEffect } from "react";
import { Icon, Button } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const Login = ({ changeLoginToSignup, toggleModal }) => {
  const [logInInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleLoginInputValue = (key) => (e) => {
    setLoginInfo({ ...logInInfo, [key]: e.target.value });
  };
  const handleLogin = (event) => {
    axios
      .post(
        "https://localhost:4000/login",
        {
          email: logInInfo.email,
          password: logInInfo.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        toggleModal();
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className={styles.modal_contents}>
      <div className={styles.signup_container}>
        <div>
          <h2>Sign In</h2>
          <img
            style={{
              display: "flex",
              width: "100px",
              marginLeft: "-1rem",
            }}
            src="/images/logo.png"
          />
        </div>
        <div className={styles.form_container}>
          <div className={styles.form}>
            <img src="/images/user.png" height="30px" width="30px" />
            <input
              type="text"
              placeholder="Email"
              onChange={handleLoginInputValue("email")}
              value={logInInfo.email}
              styles={{ width: "10rem" }}
            />
          </div>
          <div className={styles.form}>
            <img src="/images/lock.png" height="30px" width="30px" />
            <input
              type="password"
              placeholder="Password"
              onChange={handleLoginInputValue("password")}
              value={logInInfo.password}
            />
          </div>
        </div>

        <div className={styles.button}>
          <Button color="purple" onClick={handleLogin}>
            Log In
          </Button>
          <div style={{ marginTop: "0.7rem" }}>
            <Button color="violet" onClick={changeLoginToSignup}>
              Create an Account
            </Button>
          </div>
        </div>
        <br />

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
export default Login;

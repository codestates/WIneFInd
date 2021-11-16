import styles from '../../styles/Login.module.css';
import React, { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

const Login = ({ changeLoginToSignup, toggleModal, enterkey }) => {
  const [logInInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const handleLoginInputValue = (key) => (e) => {
    setLoginInfo({ ...logInInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    if (logInInfo.email === '') {
      setErrorMessage('아이디를 입력해주세요');
    } else if (logInInfo.password === '') {
      setErrorMessage('비밀번호를 입력해주세요');
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            email: logInInfo.email,
            password: logInInfo.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toggleModal();
          localStorage.setItem('winefind', res.data.token);
          console.log('login success');
        })
        .then(() => {
          window.location.reload();
          alert('로그인 되었습니다!');
        })
        .catch(() => {
          console.log('login failed');
          setErrorMessage('아이디나 비밀번호를 확인해주세요');
        });
    }
  };

  const kakaoLogin = () => {
    router.push(
      //배포할때 / 개발할때 html 빼기
      `https://kauth.kakao.com/oauth/authorize?client_id=6ab487b37d3f625148fed9baabb3e7a8&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/kakao.html&response_type=code`
    );
  };
  return (
    <div className={styles.modal_contents}>
      <div className={styles.signup_container}>
        <h2>Sign In</h2>
        <div className={styles.login_box}>
          <div className={styles.form_container}>
            <div className={styles.forms}>
              <div className={styles.form}>
                <img src='/images/user.png' height='30px' width='30px' />
                <input
                  type='text'
                  placeholder='Email'
                  onChange={handleLoginInputValue('email')}
                  value={logInInfo.email}
                  styles={{ width: '10rem' }}
                  onKeyUp={() => enterkey(handleLogin)}
                />
              </div>
              <div className={styles.form}>
                <img src='/images/lock.png' height='30px' width='30px' />
                <input
                  type='password'
                  placeholder='Password'
                  onChange={handleLoginInputValue('password')}
                  value={logInInfo.password}
                  onKeyUp={() => enterkey(handleLogin)}
                />
              </div>
            </div>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <div className={styles.button}>
              <div style={{ marginTop: '0.3rem' }}>
                <Button
                  style={{ width: '230px', backgroundColor: '#cda581' }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <Button
                  style={{ width: '230px', backgroundColor: '#cda581' }}
                  onClick={changeLoginToSignup}
                >
                  Create an Account
                </Button>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <Button
                  style={{
                    width: '230px',
                    color: 'black',
                    padding: '0.5rem',
                  }}
                  color='yellow'
                  onClick={kakaoLogin}
                >
                  <img
                    src='/images/kakao_login.png'
                    height='25px'
                    width='25px'
                  />
                  카카오 로그인
                </Button>
              </div>
            </div>
          </div>
        </div>
        <br />

        <p>Copyright ⓒ 2021. Apoint. All rights reserved.</p>
      </div>
      <Icon
        name='window close'
        className={styles.close_modal}
        onClick={toggleModal}
      />
    </div>
  );
};
export default Login;

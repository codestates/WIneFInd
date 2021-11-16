import styles from '../../styles/Login.module.css';
import { Icon, Button } from 'semantic-ui-react';
import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Signup = ({ toggleModal, changeLoginToSignup, enterkey }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });
  const [isEmailOk, setIsEmailOk] = useState(null);
  const [isPasswordOk, setIsPasswordOk] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //이메일, 비밀번호 정규식
  const regExp_Email =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExp_Password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    if (signUpInfo.email !== '') {
      if (regExp_Email.test(signUpInfo.email) === false) {
        setIsEmailOk(false);
      } else {
        setIsEmailOk(true);
      }
    }

    if (signUpInfo.password !== '') {
      if (regExp_Password.test(signUpInfo.password) === false) {
        setIsPasswordOk(false);
      } else {
        setIsPasswordOk(true);
      }
    }
  };

  const createAccount = () => {
    if (
      signUpInfo.email === '' ||
      signUpInfo.nickname === '' ||
      signUpInfo.password === '' ||
      signUpInfo.checkPassword === ''
    ) {
      setErrorMessage('모든 항목을 기입해주세요!');
      return null;
    } else if (signUpInfo.password !== signUpInfo.checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
      return null;
    } else if (!(isEmailOk && isPasswordOk)) {
      setErrorMessage('유효한 값을 입력해주세요');
      return null;
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/signup`,
          {
            email: signUpInfo.email,
            username: signUpInfo.nickname,
            password: signUpInfo.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log('signup Success!');
          localStorage.setItem('winefind', res.data.token);
          window.location.reload();
          alert('회원가입 성공하였습니다. 바로 서비스를 이용하세요!');
        })
        .catch(() => {
          alert('이미 존재하는 아이디입니다.');
          console.log('Signup failed!');
        });
    }
  };

  // 비밀번호 보이고 안보이게 하는 버튼
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(() => !showPassword);
  };

  return (
    <div className={styles.modal_contents}>
      <div className={styles.signup_container}>
        <h2>Sign Up</h2>
        <div className={styles.login_box}>
          <div className={styles.form_container} style={{ marginTop: '-20px' }}>
            <div className={styles.forms}>
              <div className={styles.form}>
                <img src='/images/email.png' height='30px' width='30px' />
                <input
                  type='text'
                  value={signUpInfo.email}
                  placeholder='Email'
                  onChange={handleInputValue('email')}
                />
                {isEmailOk === null ? (
                  <div></div>
                ) : isEmailOk ? (
                  <img width='20px' src='images/ok.png'></img>
                ) : (
                  <img width='20px' src='images/notok.png'></img>
                )}
              </div>
              <div className={styles.form}>
                <img src='/images/user.png' height='30px' width='30px' />
                <input
                  value={signUpInfo.nickname}
                  type='text'
                  placeholder='UserName'
                  onChange={handleInputValue('nickname')}
                />
              </div>
              <div className={styles.form}>
                <img src='/images/lock.png' height='30px' width='30px' />
                <input
                  value={signUpInfo.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  onChange={handleInputValue('password')}
                />
                <IconButton
                  onClick={handleClickShowPassword}
                  style={{ position: 'absolute', right: '70px', top: '165px' }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>

                {isPasswordOk === null ? (
                  <span
                    style={{
                      visibility: 'hidden',
                    }}
                  >
                    HJ!
                  </span>
                ) : isPasswordOk ? (
                  <img width='20px' src='images/ok.png'></img>
                ) : (
                  <img width='20px' src='images/notok.png'></img>
                )}
              </div>
              <div className={styles.form}>
                <img src='/images/checklock.png' height='30px' width='30px' />
                <input
                  type='password'
                  value={signUpInfo.checkPassword}
                  placeholder='Check Password'
                  onChange={handleInputValue('checkPassword')}
                  onKeyUp={() => enterkey(createAccount)}
                />
              </div>
            </div>

            <div className={styles.errorMessage}>{errorMessage}</div>
            <div className={styles.button}>
              <div style={{ marginTop: '0.3rem' }}>
                <Button
                  style={{ width: '230px', backgroundColor: '#cda581' }}
                  onClick={createAccount}
                >
                  Signup
                </Button>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <Button
                  style={{ width: '230px', backgroundColor: '#cda581' }}
                  onClick={changeLoginToSignup}
                >
                  Go to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
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

export default Signup;

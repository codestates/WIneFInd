import Sidebar from '../components/Sidebar';
import styles from '../styles/User.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import axios from 'axios';

//마이페이지  내 정보 수정 페이지
const Myprofile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userImage: '',
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  // 사진을 올리기
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  // 비밀번호 보여주기 함수
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // 비밀번호 바꾸이
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // 수정 됬으면 내 와인 추천 페이지로 가기
  function goLink() {
    router.push('/user');
  }
  // 유저 정보 조회 API
  const getUserInfo = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        console.log('res:', res.data);
        setUserInfo({ userName: res.data.userInfo.username });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <div className={styles.profile_container}>
        <Sidebar />
        <div className={styles.profile_layout}>
          {/* 사진 업로드 하는 기능 */}
          <div className={styles.background_img}>
            <div id='overlay'>
              <div className={styles.image_container}>
                <img src={createObjectURL} className={styles.image} />
                <label className={styles.image_uploader} htmlFor='input-file'>
                  Upload File
                </label>
                <input
                  type='file'
                  id='input-file'
                  style={{ display: 'none' }}
                  onChange={uploadToClient}
                />
              </div>
              {/* 유저네임 보여주는 기능 */}
              <Input
                className={styles.text}
                type='text'
                placeholder={userInfo.userName}
              />
              {/* 비밀번호 수성/ 보기 기능 */}
              <Input
                className={styles.text}
                type={values.showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange('password')}
                placeholder='Enter PASSWORD'
                value={values.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button className={styles.btn} onClick={goLink}>
              EDIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;

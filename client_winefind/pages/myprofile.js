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

//마이페이지
const Myprofile = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    if (charCode < 97 || charCode > 122) {
      var charCode = evt.charCode;
      if (charCode != 0) {
        if (charCode < 97 || charCode > 122) {
          event.preventDefault();
          displayWarning(
            'Please use lowercase letters only.' +
              '\n' +
              'charCode: ' +
              charCode +
              '\n'
          );
        }
      }
    }
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function goLink() {
    router.push('/user');
  }
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userImage: '',
  });
  const getUserInfo = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        console.log('res:', res.data);
        setUserInfo({ userName: res.data['카카오 정보'].nickname });
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
              <Input
                className={styles.text}
                type='text'
                placeholder={userInfo.userName}
              />
              <Input
                className={styles.text}
                type={values.showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange('password')}
                placeholder='Enter PASSWORD'
                value={values.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
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

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
import AWS from 'aws-sdk';

//마이페이지  내 정보 수정 페이지
const Myprofile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    userName: '',
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    username: '',
  });

  // const [editInfo, setEditInfo] = useState({
  //   username: '',
  //   password: '',
  // });
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:2c0786f6-5e2d-4f84-a3bc-9bd78b8fd55e', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log('filename???,', file.name);
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'mywinefindimagebucket',
        Key: userInfo.id + file.name,
        Body: file,
      },
    });
    // 서버한테 이미지 주소를 보내주면 끝

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      }
    );
  };
  const editUserInfo = () => {
    let url = `https://mywinefindimagebucket.s3.ap-northeast-2.amazonaws.com/${
      userInfo.id + image.name
    }`;
    console.log('???url?', url);
    console.log('???url?', typeof url);
    if (values.password !== '' && values.username !== '') {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userInfo.id}`,
          {
            email: userInfo.email,
            password: values.password,
            username: values.username,
            image: url,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log('정보 수정이 완료되었습니다.');
        })
        .catch((e) => {
          console.log('회원정보수정 실패!', e);
        });
    } else {
      console.log('이름과 비밀번호 칸이 비어있습니다');
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

  // 유저 정보 조회 API
  const getUserInfo = () => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res:', res.data);
        setUserInfo(res.data.userInfo);
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
                <img
                  src={createObjectURL}
                  style={{
                    backgroundColor: 'white',
                    backgroundImage: `url(${
                      createObjectURL ? '' : userInfo.image
                    })`,
                  }}
                  className={styles.image}
                />
                <label className={styles.image_uploader} htmlFor='input-file'>
                  Upload File
                </label>
                <input
                  type='file'
                  id='input-file'
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />
              </div>
              {/* 유저네임 보여주는 기능 */}
              <Input
                className={styles.text}
                type='text'
                placeholder={userInfo.username}
                onChange={handlePasswordChange('username')}
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
            <button className={styles.btn} onClick={editUserInfo}>
              EDIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;

import Sidebar from '../components/Sidebar';
import styles from '../styles/User.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import AWS from 'aws-sdk';
import Edit from '../components/Edit';
import { Menu } from 'semantic-ui-react';
//마이페이지  내 정보 수정 페이지
const Myprofile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    username: '',
  });
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
        console.log('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('다른 이미지를 선택해주세요: ', err.message);
      }
    );
  };
  const editUserInfo = () => {
    if (values.password === '' && values.username === '' && image === null) {
      alert('변경 사항이 없어요');
    } else if (
      values.username !== userInfo.username &&
      userInfo.email.slice(0, 11) === 'Guest_KaKao'
    ) {
      alert(
        '카카오 로그인 유저는 유저이름을 바꿀 수 없습니다. 회원 정보를 수정하시려면 본인 성함을 적어주세요.'
      );
    } else {
      let image_url;
      let new_password;
      let new_username;

      if (image === null) {
        image_url = userInfo.image;
        console.log('image null');
      } else {
        image_url = `https://mywinefindimagebucket.s3.ap-northeast-2.amazonaws.com/${
          userInfo.id + image.name
        }`;
      }
      if (values.username === '') {
        new_username = userInfo.username;
        console.log('username is null');
      } else {
        console.log('there is username');
        new_username = values.username;
      }

      if (values.password === '') {
        alert('회원정보를 수정하시려면 비밀번호를 입력해주세요');
      } else {
        new_password = values.password;
        alert('현재 입력하신 비밀번호로 수정됩니다');
        console.log('password change');
      }

      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userInfo.id}`,
          {
            email: userInfo.email,
            password: new_password,
            username: new_username,
            image: image_url,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log('정보 수정이 완료되었습니다.');
          alert('정보 수정이 완료되었습니다.');
        })
        .catch((e) => {
          console.log('회원정보수정 실패!', e);
        });
    }
  };

  // 비밀번호 보여주기 함수
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // 비밀번호 바꾸기
  const handleEditChange = (prop) => (event) => {
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
        setUserInfo(res.data.userInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const goToResign = () => {
    router.push('/resign');
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
            <Edit
              handleClickShowPassword={handleClickShowPassword}
              handleEditChange={handleEditChange}
              handleFileInput={handleFileInput}
              createObjectURL={createObjectURL}
              userInfo={userInfo}
              values={values}
              editUserInfo={editUserInfo}
            />
            <button className={styles.btn_resign} onClick={goToResign}>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;

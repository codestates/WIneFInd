import axios from 'axios';
import router from 'next/router';
import { useEffect } from 'react';

const Kakao = () => {
  useEffect(() => {
    let code = document.location.href.split('code=')[1];
    if (code) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/kakao?code=${code}`, {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.setItem('winefind', res.data.token);
          console.log('what comes here?', res);
          console.log('kakao login success');
          window.location.replace('http://localhost:3000');
          setTimeout(alert('카카오 로그인 되었습니다'), 3000);
          //배포할때
          // window.location.replace(
          //   'http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com'
          // );
        })
        .catch((e) => {
          console.log('get kakao api failed:', e);
          window.location.replace('http://localhost:3000');

          // 배포할때
          // window.location.replace(
          //   'http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com'
          // );
        });
    }
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <img src='images/loading.gif' />
    </div>
  );
};

export default Kakao;

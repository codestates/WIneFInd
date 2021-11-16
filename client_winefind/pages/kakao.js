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

          console.log('kakao login success');
          //배포할때 / 개발할때 html 빼기 (여긴 됨)
          window.location.replace(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
          setTimeout(alert('카카오 로그인 되었습니다'), 3000);
        })
        .catch((e) => {
          console.log('get kakao api failed:', e);
          window.location.replace(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
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

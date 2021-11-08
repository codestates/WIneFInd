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
        .then(() => {
          // router.push('/mall');
          console.log('kakao login success');
        })
        .catch((e) => {
          console.log('get kakao api failed:', e);
          // router.push('/index');
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

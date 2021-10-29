import axios from 'axios';
import router, { withRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Kakao = () => {
  useEffect(() => {
    let code = document.location.href.split('code=')[1]
    if (code) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/kakao?code=${code}`, {
          withCredentials: true,
        })
        .then(() => {
          router.push('/index');
          console.log('kakao login success');
        })
        .catch((e) => {
          console.log('get kakao api failed:', e);
          router.back();
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

import axios from 'axios';
import router from 'next/router';
import { useEffect } from 'react';

const Result = () => {
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

export default Result;

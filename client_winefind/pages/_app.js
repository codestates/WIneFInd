import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import Footer from '../components/Footer';
import Top from '../components/Top';

import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(() => !modal);
  };

  //scroll 방지 함수
  if (modal === true) {
    useEffect(() => {
      document.body.style.overflowY = 'hidden';
    });
  } else {
    useEffect(() => {
      document.body.style.overflowY = 'scroll';
    });
  }
  //login modal

  return (
    <>
      <div className='mainpage_container'>
        <Top toggleModal={toggleModal} modal={modal} />
        <Component toggleModal={toggleModal} modal={modal} {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
export default MyApp;

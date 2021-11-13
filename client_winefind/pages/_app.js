import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import Footer from '../components/Layout/Footer';
import Top from '../components/Layout/NavBar';

import React, { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(() => !modal);
  };

  return (
    <>
      <div className='mainpage_container'>
        <Top toggleModal={toggleModal} modal={modal} />
        <div className='guide_container'>
          <Component toggleModal={toggleModal} modal={modal} {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default MyApp;

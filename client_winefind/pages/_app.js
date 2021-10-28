import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../components/Footer";
import Top from "../components/Top";

import React, { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="mainpage_container">
        <Top toggleModal={toggleModal} modal={modal} />
        <Component toggleModal={toggleModal} modal={modal} {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
export default MyApp;

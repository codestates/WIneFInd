import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../components/Footer";
import Top from "../components/Top";
import { Icon } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import next from "next";
import { useRouter } from "next/dist/client/router";
function MyApp({ Component, pageProps }) {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  //go to top button

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(() => !modal);
  };

  //scroll 방지 함수
  if (modal === true) {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
    });
  } else {
    useEffect(() => {
      document.body.style.overflowY = "scroll";
    });
  }
  //login modal

  return (
    <>
      <div className="mainpage_container">
        <Top toggleModal={toggleModal} modal={modal} />
        <Component {...pageProps} />
        <Footer />
      </div>
      {showButton && (
        <div className="gototop">
          <Icon
            onClick={scrollToTop}
            name="arrow alternate circle up"
            size="huge"
          />
        </div>
      )}
    </>
  );
}
export default MyApp;

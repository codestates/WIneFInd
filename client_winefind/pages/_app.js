import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../components/Footer";
import Top from "../components/Top";
import { Icon } from "semantic-ui-react";
import React, { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showButton, setShowButton] = useState(false);

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

  return (
    <>
      <div className={styles.mainpage_container}>
        <Top />
        <Component {...pageProps} />
        <Footer />
      </div>
      {showButton && (
        <div className={styles.gototop}>
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

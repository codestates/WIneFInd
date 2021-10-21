import styles from "../styles/Home.module.css";

import { useState } from "react";

const Top = () => {
  const [GlobalState, setGlobalState] = useState({ currentPage: "home" });

  return (
    <div className={styles.top_container}>
      <img className={styles.logo} src="/images/logo.png" />
      &nbsp;&nbsp;<h1>WIne FInd</h1>
    </div>
  );
};

export default Top;

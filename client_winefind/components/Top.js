import styles from "../styles/Home.module.css";
import { Menu, Segment } from "semantic-ui-react";
import { useState } from "react";

const Top = () => {
  const [GlobalState, setGlobalState] = useState({ currentPage: "home" });

  return (
    <div>
      <img className={styles.logo} src="/images/WineFind_Logo.png" />
      <h1>WIne FInd</h1>
    </div>
  );
};

export default Top;

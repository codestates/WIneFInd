import styles from "../styles/Home.module.css";
const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.contactus}>
        <h3>Contact Us</h3>

        <div>
          <a href="https://github.com/codestates/WIneFInd">
            <img src="/images/github.png" height="50px" width="50px"></img>
          </a>
          &nbsp;&nbsp;&nbsp;
          <a href="https://localhost:3000/inquiry">
            <img src="/images/inquiry.png" height="50px" width="50px"></img>
          </a>
        </div>
      </div>
      <br />
      <br />
      <div className={styles.footer_rights}>
        Copyright ⓒ 2021. Apoint. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

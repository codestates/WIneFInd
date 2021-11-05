import styles from '../../styles/Footer.module.css';
import { Icon } from 'semantic-ui-react';
const Footer = () => {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={styles.footer_container}>
        <div className={styles.contactus}>
          <h3>Contact Us</h3>
          <div>
            <a href='https://github.com/codestates/WIneFInd'>
              <img src='/images/github.png' height='50px' width='50px'></img>
            </a>
            &nbsp;&nbsp;&nbsp;
            <img src='/images/inquiry.png' height='50px' width='50px'></img>
          </div>
        </div>
        <div className={styles.footer_rights}>
          Copyright ⓒ 2021. Apoint. All rights reserved.
        </div>
        <Icon
          onClick={goToTop}
          name='arrow alternate circle up'
          size='huge'
          style={{ cursor: 'pointer' }}
        />
      </div>
    </>
  );
};

export default Footer;

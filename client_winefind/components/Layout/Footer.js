import styles from '../../styles/Footer.module.css';
import { Icon } from 'semantic-ui-react';
const Footer = () => {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={styles.footer_container}>
        {/* <div style={{ width: '200px' }}></div> */}

        <div className={styles.contactus}>
          <h3>Contact Us</h3>
          <div className={styles.git}>
            <a href='https://github.com/codestates/WIneFInd'>
              <img src='/images/github.png' height='50px' width='50px'></img>
            </a>
            &nbsp;&nbsp;&nbsp;
            <div>
              <div>
                <a
                  style={{ color: 'white' }}
                  href='https://github.com/Ryanromaris'
                >
                  김형준 (Team Leader, Front-end Engineer)
                </a>
              </div>
              <div>
                <a
                  style={{ color: 'white' }}
                  href='https://github.com/UnicusStella'
                >
                  박민준 (Back-end Engineer)
                </a>
              </div>
              <div>
                <a style={{ color: 'white' }} href='https://github.com/sehan95'>
                  한승우 (Front-end Engineer)
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_rights}>
          Copyright ⓒ 2021. Apoint. All rights reserved.
        </div>
        <div style={{ width: '300px', marginTop: '35px' }}>
          <div>
            <div>
              <div style={{ color: 'white' }}>
                김형준&nbsp; ryanromaris@naver.com
              </div>
            </div>
            <div>
              <div style={{ color: 'white' }}>
                박민준&nbsp; unicusstella@gmail.com
              </div>
            </div>
            <div>
              <div style={{ color: 'white' }}>
                한승우&nbsp; sehan95@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

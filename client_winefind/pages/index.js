import styles from '../styles/Home.module.css';
import classNames from 'classnames';
import CardCompo from '../components/CardCompo';

import IndexTest from '../components/IndexTest';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro_container}>
        <div className={styles.intro_message}>
          <div className={styles.separate1}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <h1 className={styles.title_text}>WINE FIND</h1>
          <div className={styles.content_container}>
            <div className={styles.separate}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className={styles.intro_back}>
              <div className={styles.intro_content}>
                <h1 style={{ fontFamily: 'Playfair Display, serif' }}>
                  Welcome to WINE FIND
                </h1>
                <br />
                <br />
                WIne FIne, and you?
                <br />
                <br />
                여러분의 와인지식, 안녕하신가요?
                <br />
                <br />
                누구나 와인을 쉽고 빠르게 배울 수 있습니다. <br />
                <br />
                간단한 테스트를 통해 인생 와인을 찾아드려요!
                <br />
                <br />
                WIne FInd와 함께라면, 여러분은 더이상 와린이가 아닙니다.
                <br />
                <br /> 바로 시작해보세요!
              </div>
            </div>
          </div>
          <div className='text logo'>
            <div
              className={classNames(styles.logo_effect, styles.goToPosition)}
            >
              <div className={classNames(styles.box, styles.fade_in_box)}>
                WI
              </div>
              <div
                className={classNames(
                  styles.box,
                  styles.animated,
                  styles.bounceInLeft
                )}
              >
                NE&nbsp;&nbsp;
              </div>
              <div className={classNames(styles.box, styles.fade_in_box)}>
                FI
              </div>
              <div
                className={classNames(
                  styles.box,
                  styles.animated,
                  styles.bounceInLeft
                )}
              >
                ND
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.learn_container}>
        <div className={styles.learn_head}>
          <h1 className={styles.learn_head}>Most Searched Wines</h1>
        </div>
        <CardCompo />
      </div>

      <div className={styles.testing_container}>
        <IndexTest />
      </div>
    </div>
  );
};

export default Home;

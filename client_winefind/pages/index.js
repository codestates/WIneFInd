import styles from '../styles/Home.module.css';
import Head from 'next/head';
import classNames from 'classnames';
import Login from '../components/Login';

const Home = () => {
  return (
    <div className={styles.container}>
      <Login />
      <div className={classNames(styles.logo_container, styles.goToPosition)}>
        <div className={classNames(styles.box, styles.fade_in_box)}>WI</div>
        <div
          className={classNames(
            styles.box,
            styles.animated,
            styles.bounceInLeft
          )}
        >
          ne&nbsp;&nbsp;
        </div>
        <div className={classNames(styles.box, styles.fade_in_box)}>FI</div>
        <div
          className={classNames(
            styles.box,
            styles.animated,
            styles.bounceInLeft
          )}
        >
          nd
        </div>
      </div>
    </div>
  );
};

export default Home;

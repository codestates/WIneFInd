import styles from '../styles/Home.module.css';
import CardCompo from '../components/CardCompo';
import IntroAni from '../components/IntroAni';
import IndexTest from '../components/IndexTest';
import { useEffect } from 'react';

const Home = () => {
  const goToTop = () => {
    window.scrollTo(0, 80);
  };
  useEffect(() => {
    goToTop();
  }, []);

  return (
    // 사이트 소개 섹션
    <div className={styles.container}>
      <IntroAni />
      <div className={styles.learn_container}>
        {/* 가장 많이 검색 되는 와인들 섹션 */}
        <div className={styles.learn_head}>
          <p className={styles.learn_head}>Most Searched Wines</p>
        </div>
        <CardCompo />
      </div>
      {/* 와인 취향 테스트 받으로 가기 섹션 */}
      <div className={styles.testing_container}>
        <IndexTest />
      </div>
    </div>
  );
};

export default Home;

import styles from '../styles/Home.module.css';
import CardCompo from '../components/Landing/CardCompo';
import Introduction from '../components/Landing/Introduction';
import IndexInfo from '../components/Landing/IndexInfo';
import IndexInfoTwo from '../components/Landing/IndexInfoTwo';
import IndexInfoThree from '../components/Landing/IndexInfoThree';
import IndexInfoFour from '../components/Landing/IndexIndexFour';

const Home = () => {
  return (
    // 사이트 소개 섹션
    <div className={styles.container}>
      <div className={styles.intro_con}>
        <Introduction />
      </div>

      <div className={styles.learn_container}>
        <div className={styles.learn_head}>다양한 와인을 만나보세요</div>
        <CardCompo />
      </div>
      {/* 와인 취향 테스트 설명 섹션 */}
      <div className={styles.testing_container}>
        <IndexInfo />
      </div>
      <div className={styles.testing_container}>
        <IndexInfoTwo />
      </div>
      <div className={styles.testing_container}>
        <IndexInfoThree />
      </div>
      <div className={styles.testing_container}>
        <IndexInfoFour />
      </div>
    </div>
  );
};

export default Home;

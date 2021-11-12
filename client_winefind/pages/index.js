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
        <div className={styles.info_title}>와인 테스트를 해보세요</div>
        <IndexInfo />
      </div>
      <div className={styles.testing_container}>
        <div style={{ marginLeft: '65%' }} className={styles.info_title}>
          테스트 결과를 확인하세요
        </div>
        <IndexInfoTwo />
      </div>
      <div className={styles.testing_container}>
        <div className={styles.info_title}>와인을 판매하세요</div>
        <IndexInfoThree />
      </div>
      <div className={styles.testing_container}>
        <div style={{ marginLeft: '70%' }} className={styles.info_title}>
          와인을 검색하세요
        </div>
        <IndexInfoFour />
      </div>
    </div>
  );
};

export default Home;

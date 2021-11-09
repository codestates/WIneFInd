import styles from '../styles/Home.module.css';
import CardCompo from '../components/Landing/CardCompo';
import Introduction from '../components/Landing/Introduction';
import IndexInfo from '../components/Landing/IndexInfo';
import IndexInfoTwo from '../components/Landing/IndexInfoTwo';
import IndexInfoThree from '../components/Landing/IndexInfoThree';

const Home = () => {
  return (
    // 사이트 소개 섹션
    <div className={styles.container}>
      <div className={styles.intro_con}>
        <Introduction />
      </div>

      <div className={styles.learn_container}>
        {/* 가장 많이 검색 되는 와인들 섹션 */}
        <div className={styles.learn_head}>
          <p className={styles.learn_head}>Most Searched Wines</p>
        </div>
        <CardCompo />
      </div>
      {/* 와인 취향 테스트 설명 섹션 */}
      <div className={styles.testing_container}>
        <div className={styles.info_title}>추천 방식</div>
        <IndexInfo />
      </div>
      <div className={styles.testing_container}>
        <div className={styles.info_title}>와인 몰은 이렇게</div>
        <IndexInfoTwo />
      </div>
      <div className={styles.testing_container}>
        <div className={styles.info_title}>우리 사이트 소개</div>
        <IndexInfoThree />
      </div>
    </div>
  );
};

export default Home;

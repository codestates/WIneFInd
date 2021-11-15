import styles from '../../styles/Home.module.css';
import { Icon } from 'semantic-ui-react';
const IndexInfoFour = () => {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_container}>
        <div style={{ marginLeft: '70%' }} className={styles.info_title}>
          와인을 검색하세요
        </div>
        <div className={styles.testing_intro4}>&nbsp; &nbsp;&nbsp;</div>
        <div className={styles.testing_containtwo}>
          <div className={styles.testing_p}>
            찾으시는 와인의 타입, 국가, 맛을 검색하세요
            <br />
            다양한 와인들을 손쉽게 찾을 수 있어요.
            <br />
            <br />
            WIne FInd에 오신 것을 환영합니다!
            <br />
            지금 바로 시작하세요!
            <br />
            <Icon
              style={{ marginLeft: '40%', cursor: 'pointer' }}
              onClick={goToTop}
              size='big'
              name='arrow circle up'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexInfoFour;

import styles from '../../styles/Home.module.css';

const IndexInfo = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_container}>
        <div className={styles.testing_contain}>
          <p className={styles.testing_p}>
            당신에게 잘 맞는 와인은 무엇일까요?
            <br />
            지금 바로 와인 취향 테스트를 해보세요!
          </p>
        </div>
        <div className={styles.testing_intro}>&nbsp; &nbsp;&nbsp;</div>
      </div>
    </>
  );
};

export default IndexInfo;

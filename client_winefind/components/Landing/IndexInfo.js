import styles from '../../styles/Home.module.css';

const IndexInfo = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_container}>
        <div className={styles.info_title}>와인 테스트를 해보세요</div>
        <div className={styles.testing_contain}>
          <div className={styles.testing_p}>
            당신에게 꼭 맞는 와인을 찾아드려요.
            <br />
            7가지 질문에 편하게 답변해 주시면, <br />
            여러분의 취향에 맞는 와인을 추천해드려요.
            <br />
            여러분의 취향에 맞는 와인은 어떤 와인일까요?
          </div>
          {/* <div className={styles.whiteback}></div> */}
        </div>
        <div className={styles.testing_intro}>&nbsp; &nbsp;&nbsp;</div>
      </div>
    </>
  );
};

export default IndexInfo;

import styles from '../../styles/Home.module.css';

const IndexInfoThree = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_container}>
        <div className={styles.info_title}>와인을 판매하세요</div>
        <div className={styles.testing_contain}>
          <p className={styles.testing_p}>
            판매하시려는 와인의 정보를 입력하시고
            <br />
            사진을 업로드해주세요.
            <br />
            간편하게 와인을 판매할 수 있어요.
            <br />
            판매할 와인을 와인 몰에서 확인하세요!
          </p>
        </div>
        <div className={styles.testing_intro3}>&nbsp; &nbsp;&nbsp;</div>
      </div>
    </>
  );
};

export default IndexInfoThree;

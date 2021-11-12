import styles from '../../styles/Home.module.css';

const IndexInfoTwo = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_container}>
        <div style={{ left: '50px' }} className={styles.testing_intro}>
          &nbsp; &nbsp;&nbsp;
        </div>
        <div
          style={{
            position: 'relative',
            left: '700px',
            height: '400px',
          }}
          className={styles.testing_containtwo}
        >
          <div className={styles.testing_p}>
            테스트 결과를 확인하세요!
            <br />
            와인몰에서 추천받은 와인과 다양한 와인들을
            <br /> 볼 수 있어요.
            <br />
            마음에 드는 와인을 장바구니에 담고 <br />
            간편하게 구매하세요.
          </div>
          {/* <div className={styles.whiteback}></div> */}
        </div>
      </div>
    </>
  );
};

export default IndexInfoTwo;

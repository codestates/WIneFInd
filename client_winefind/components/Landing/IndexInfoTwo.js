import styles from '../../styles/Home.module.css';

const IndexInfoTwo = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.info_containertwo}>
        <div className={styles.testing_introtwo}>&nbsp; &nbsp;&nbsp;</div>
        <div className={styles.testing_containtwo}>
          <p className={styles.testing_ptwo}>
            당신은 와인을 좋아하시나요? 직접 갖고 계신 와인을 판매하고
            싶으신가요? 저희는 와인몰에서는 최상급의 와인만을 판매 및 추천을
            해드립니다.
            <br />
            <br />
            지금 바로 와인 몰로 이동해 여러 와인들을 살표보세요!
          </p>
        </div>
      </div>
    </>
  );
};

export default IndexInfoTwo;

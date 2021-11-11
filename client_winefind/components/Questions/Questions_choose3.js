import styles from '../../styles/Test.module.css';

export default function Questions_choose3({ questionnum, next }) {
  return (
    <div>
      <div className={styles.stars_choose_container}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>
            {questionnum}.&nbsp;&nbsp; 음식을 드실 때, 선호하시는 맛을
            골라주세요!
          </h2>
        </div>
        <hr></hr>
        <div className={styles.stars_choose}>
          {/* 1-5 누르는 rating 와인잔들 */}
          <button onClick={() => next('1')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('1')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('2')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('2')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('2')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
        </div>
        <div className={styles.ratetext_choose} style={{ margin: '30px 2%' }}>
          <div>
            <h1>독특하고 새로운 맛</h1>
          </div>
          <div>
            <h1>무난하고 대중적인 맛</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

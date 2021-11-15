import styles from '../../styles/Test.module.css';

export default function Questions_choose2({ questionnum, next }) {
  return (
    <div>
      <div className={styles.stars_choose_container}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>
            {questionnum}.&nbsp;&nbsp; 커피를 마실 때, 산도가 있는 편을
            좋아하시나요?
          </h2>
        </div>
        <hr></hr>
        <div className={styles.stars_choose}>
          {/* 1-5 누르는 rating 와인잔들 */}
          <button onClick={() => next('5')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('4')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('3')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('2')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('1')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
        </div>
        <div className={styles.ratetext_choose}>
          <div>
            <h1>네! 좋아해요</h1>
          </div>
          <div>
            <h1>아니요..</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

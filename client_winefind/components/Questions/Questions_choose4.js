import router from 'next/router';
import styles from '../../styles/Test.module.css';

export default function Questions_choose3({
  setFinishOrNot,
  questionnum,
  next,
}) {
  return (
    <div>
      <div className={styles.stars_choose_container}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>{questionnum}.&nbsp;&nbsp; 가장 좋아하는 향을 골라주세요!</h2>
        </div>
        <hr></hr>
        <div className={styles.stars_choose}>
          {/* 1-5 누르는 rating 와인잔들 */}
          <button onClick={() => next('레몬')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('베리')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('꽃')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('오크')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
          <button onClick={() => next('')} className={styles.winebtn}>
            <img src='/images/redw.png' />
          </button>
        </div>
        <div className={styles.ratetext_choose} style={{ margin: '30px 9%' }}>
          <div>
            <h1>레몬향</h1>
          </div>
          <div>
            <h1>베리향</h1>
          </div>
          <div>
            <h1> 꽃 향</h1>
          </div>
          <div>
            <h1>오크향</h1>
          </div>
          <div>
            <h1>몰라요</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from '../../styles/Test.module.css';
import classNames from 'classnames';
export default function Questions_image1({ questionnum, next }) {
  return (
    <div>
      <div className={classNames('text_font', styles.stars_container)}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>{questionnum}.&nbsp;&nbsp; 어떤 도수의 소주를 선호하세요?</h2>
        </div>
        <div className={styles.stars}>
          {/* 1-5 누르는 rating 와인잔들 */}

          <button onClick={() => next('1')} className={styles.winebtn_image}>
            <div className={styles.first_image}></div>
          </button>
          <div style={{ alignSelf: 'center', fontSize: '3rem' }}>VS</div>
          <button onClick={() => next('2')} className={styles.winebtn_image}>
            <div className={styles.second_image}></div>
          </button>
        </div>
        <div className={styles.ratetext}>
          <div>
            <div>일반 소주</div>
          </div>
          <div>
            <div>과일 소주</div>
          </div>
        </div>
      </div>
    </div>
  );
}

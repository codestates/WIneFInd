import styles from '../../styles/Test.module.css';
import classNames from 'classnames';
export default function Questions_image3({ questionnum, question, next }) {
  return (
    <div>
      <div className={classNames('text_font', styles.stars_container)}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>{questionnum}.&nbsp;&nbsp;어떤 맛 우유를 더 좋아하시나요? </h2>
        </div>
        <div className={styles.stars} style={{ marginTop: '70px' }}>
          {/* 1-5 누르는 rating 와인잔들 */}
          <button onClick={() => next('초코')} className={styles.winebtn_image}>
            <div className={styles.fifth_image}></div>
          </button>
          <div style={{ alignSelf: 'center', fontSize: '3rem' }}>VS</div>
          <button onClick={() => next('딸기')} className={styles.winebtn_image}>
            <div className={styles.sixth_image}></div>
          </button>
        </div>
        <div className={styles.ratetext}>
          <div>
            <div>초코우유</div>
          </div>
          <div>
            <div>딸기우유</div>
          </div>
        </div>
      </div>
    </div>
  );
}

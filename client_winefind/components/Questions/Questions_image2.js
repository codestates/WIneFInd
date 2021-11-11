import styles from '../../styles/Test.module.css';
import classNames from 'classnames';
export default function Questions_image2({ questionnum, question, next }) {
  return (
    <div>
      <div className={classNames('text_font', styles.stars_container)}>
        <div className={styles.question_container}>
          {/* 질문들 */}
          <h2>{questionnum}.&nbsp;&nbsp;더 선호하시는 음료를 골라주세요! </h2>
        </div>
        <div className={styles.stars} style={{ marginTop: '70px' }}>
          {/* 1-5 누르는 rating 와인잔들 */}
          <button onClick={() => next('1')} className={styles.winebtn_image}>
            <div className={styles.third_image}></div>
          </button>
          <div style={{ alignSelf: 'center', fontSize: '3rem' }}>VS</div>
          <button onClick={() => next('2')} className={styles.winebtn_image}>
            <div className={styles.fourth_image}></div>
          </button>
        </div>
        <div className={styles.ratetext}>
          <div>
            <div>콜라</div>
          </div>
          <div>
            <div>트레비</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from '../styles/Test.module.css';
import Carousel from '../components/Carousel';
import Questions from '../components/Questions';

const Test = () => {
  return (
    <div>
      <Carousel>
        {/* 여기 안에 있는 애들은 다 props children으로 들어간다*/}
        <div className={styles.questions}>
          <Questions questionnum={1} question='나는 사탕을 매우 좋아한다' />
        </div>
        <div className={styles.questions}>
          <Questions
            questionnum={2}
            question='아이셔 정도에 신것은 좋아합니까?'
          />
        </div>
        <div className={styles.questions}>
          <Questions questionnum={3} question='나는 퍽퍽한 것을 좋아한다' />
        </div>
        <div className={styles.questions}>
          <Questions questionnum={4} question='나는 탄산수를 좋아한다' />
        </div>
        <div className={styles.questions}>
          <Questions
            questionnum={5}
            question='나는 술 도수가 높은 와인을 좋아한다'
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Test;

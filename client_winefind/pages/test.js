import styles from '../styles/Test.module.css';
import Questions from '../components/Questions';
import React from 'react';
import { useState } from 'react';
import { Progress } from 'semantic-ui-react';

const Test = () => {
  const length = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(100 / length);

  //다음 슬라이드로 이동
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      setPercent(percent < 100 ? percent + 100 / length : 100);
    }
  };
  //전 슬라이드로 이동
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setPercent(percent > 0 ? percent - 100 / length : 0);
    }
  };

  return (
    <>
      <div className={styles.carousel_container}>
        <div className={styles.progress_container}>
          {/* 질문들을 통해 움직이는 progress bar */}
          <Progress
            percent={percent}
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#2F2F2F',
            }}
            indicating
          />
        </div>
        <div className={styles.carousel_wrapper}>
          {/* 전 슬라이드 화살표 */}
          {currentIndex > 0 && (
            <button onClick={prev} className={styles.left_arrow}>
              &lt;
            </button>
          )}
          <div className={styles.carousel_content_wrapper}>
            <div
              className={styles.carousel_content}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* 여기서부터 질문들 슬라이드 시작 */}
              <div className={styles.questions}>
                <Questions
                  next={next}
                  questionnum={1}
                  question='단거가 얼마나 좋으십니까?'
                />
              </div>
              <div className={styles.questions}>
                <Questions
                  next={next}
                  questionnum={2}
                  question='아이셔 정도에 신것은 좋아합니까?'
                />
              </div>
              <div className={styles.questions}>
                <Questions
                  next={next}
                  questionnum={3}
                  question='나는 퍽퍽한 것을 좋아한다'
                />
              </div>
              <div className={styles.questions}>
                <Questions next={next} questionnum={4} question='' />
              </div>
            </div>
          </div>
          {/* 다음 슬라이드 이동 화살표 */}
          {currentIndex < length - 1 && (
            <button onClick={next} className={styles.right_arrow}>
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;

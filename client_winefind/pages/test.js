import styles from '../styles/Test.module.css';
import Questions from '../components/Questions';
import Questions_image1 from '../components/Questions/Questions_image1';
import Questions_image2 from '../components/Questions/Questions_image2';
import Questions_image3 from '../components/Questions/Questions_image3';
import Questions_choose1 from '../components/Questions/Questions_choose1';
import Questions_choose2 from '../components/Questions/Questions_choose2';
import Questions_choose3 from '../components/Questions/Questions_choose3';
import Questions_choose4 from '../components/Questions/Questions_choose4';
import React from 'react';
import { useState } from 'react';
import { Progress } from 'semantic-ui-react';
import classNames from 'classnames';
import Result from '../components/Result';
import axios from 'axios';
const Test = () => {
  const length = 8;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(100 / length);
  const [finishOrNot, setFinishOrNot] = useState(false);
  const [result, setResult] = useState([]);
  const [resultWine, setResultWine] = useState([]);
  //결과를 보낼때, length가 7인지확인하고 axios 보낸다.

  //결과를 axios 보내고

  //다음 슬라이드로 이동

  const next = (val) => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      setPercent(percent < 100 ? percent + 100 / length : 100);
    }
    console.log('val??', val);
    setResult([...result, val]);
  };
  //전 슬라이드로 이동
  // const prev = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex((prevState) => prevState - 1);
  //     setPercent(percent > 0 ? percent - 100 / length : 0);
  //   }
  // };

  const goToResult = () => {
    setFinishOrNot(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/article/algo`,
        {
          body: result[0],
          sweet: result[1],
          taste: result[2],
          tannic: result[3],
          acidity: result[4],
          grape: result[5],
          aroma: result[6],
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('?????????', res);
        setResultWine(res.data);
      })
      .catch((e) => {
        console.log('e', e);
      });
  };

  return (
    <>
      {finishOrNot ? (
        <Result resultWine={resultWine} result={result} />
      ) : (
        <div className={styles.carousel_container}>
          <div className={styles.progress_container}>
            {/* 질문들을 통해 움직이는 progress bar */}
            <Progress
              percent={percent}
              style={{
                width: '100%',
                top: '5px',
                height: '20px',
                backgroundColor: '#2F2F2F',
              }}
              indicating
            />
          </div>
          <div className={classNames('text_font', styles.carousel_wrapper)}>
            {/* 전 슬라이드 화살표 */}
            {/* {currentIndex > 0 && (
              <button onClick={prev} className={styles.left_arrow}>
                &lt;
              </button>
            )} */}
            <div className={styles.carousel_content_wrapper}>
              <div
                className={styles.carousel_content}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {/* 여기서부터 질문들 슬라이드 시작 */}
                <div className={styles.questions}>
                  <Questions_image1 next={next} questionnum={1} />
                </div>
                <div className={styles.questions}>
                  <Questions_image2 next={next} questionnum={2} />
                </div>
                <div className={styles.questions}>
                  <Questions_image3 next={next} questionnum={3} />
                </div>
                <div className={styles.questions}>
                  <Questions_choose1 next={next} questionnum={4} />
                </div>
                <div className={styles.questions}>
                  <Questions_choose2 next={next} questionnum={5} />
                </div>
                <div className={styles.questions}>
                  <Questions_choose3 next={next} questionnum={6} />
                </div>
                <div className={styles.questions}>
                  <Questions_choose4
                    next={next}
                    questionnum={7}
                    setFinishOrNot={setFinishOrNot}
                    setResult={setResult}
                  />
                </div>
                <div className={styles.submit}>
                  <button className={styles.submit_btn} onClick={goToResult}>
                    테스트 결과보기
                  </button>
                </div>
              </div>
            </div>
            {/* 다음 슬라이드 이동 화살표 */}
            {/* {currentIndex < length - 1 && (
              <button onClick={next} className={styles.right_arrow}>
                &gt;
              </button>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Test;

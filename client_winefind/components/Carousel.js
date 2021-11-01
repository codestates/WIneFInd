import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/Test.module.css';
import { Progress } from 'semantic-ui-react';

const Carousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { children } = props;
  const [length, setLength] = useState(children.length);
  const [percent, setPercent] = useState(100 / children.length);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      setPercent(percent < 100 ? percent + 100 / children.length : 100);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setPercent(percent > 0 ? percent - 100 / children.length : 0);
    }
  };

  return (
    <>
      {/* className={styles.progress}  */}

      <div className={styles.carousel_container}>
        <div className={styles.progress_container}>
          <Progress
            percent={percent}
            style={{
              width: '100%',
              height: '15px',
              backgroundColor: '#2F2F2F',
            }}
            indicating
          />
        </div>
        <div className={styles.carousel_wrapper}>
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
              {children}
            </div>
          </div>
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

export default Carousel;

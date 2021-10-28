import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/Test.module.css'; //will be added later

const Carousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { children } = props;
  const [length, setLength] = useState(children.length);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div className={styles.carousel_container}>
      <div className={styles.carousel_wrapper}>
        {currentIndex > 0 && (
          <button onClick={prev} className='left-arrow'>
            Prev
          </button>
        )}
        <div className={styles.carousel_content_wrapper}>
          <div
            className={styles.carousel_content}
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className={styles.right_arrow}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;

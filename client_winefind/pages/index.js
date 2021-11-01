import styles from '../styles/Home.module.css';
import classNames from 'classnames';
import CardCompo from '../components/CardCompo';
import { Icon } from 'semantic-ui-react';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const wines = [
  {
    index: 1,
    name: 'Petrus 1998',
    region: 'Pretini Petrus',
    img: '../public/images/petrus.png',
    price: 9900,
  },
  {
    index: 2,
    name: 'lapola 2001',
    region: 'Louis Latour',
    img: '../public/images/lapola.jpeg',
    price: 12000,
  },
  {
    index: 3,
    name: 'michelle 1980',
    region: 'Regio Mich',
    img: '../public/images/mainpage.jpg',
    price: 2900,
  },
];
const delay = 4000;
let taste = (
  <table className={styles.tasteStructure}>
    <tbody>
      {/* 여기서부턴 Light && Bold */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Light</div>
        </td>
        <td className={styles.tasteStructure_progressBar}>
          <div className={styles.indicatorBar_meter}>
            <span
              className={styles.indicatorBar_progress}
              style={{ width: '15%', left: '60%' }} // left는 85% 가 max이다 85 안넘기 조심하기
            ></span>
          </div>
        </td>
        <td>
          <div className='tasteStructure_property'>Bold</div>
        </td>
      </tr>
      {/* 여기서부턴 smooth && tannic */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Smooth</div>
        </td>
        <td className={styles.tasteStructure_progressBar}>
          <div className={styles.indicatorBar_meter}>
            <span
              className={styles.indicatorBar_progress}
              style={{ width: '15%', left: '55%' }}
            ></span>
          </div>
        </td>
        <td>
          <div className='tasteStructure_property'>Tannic</div>
        </td>
      </tr>
      {/* 여기서부턴 dry && sweet */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Dry</div>
        </td>
        <td className={styles.tasteStructure_progressBar}>
          <div className={styles.indicatorBar_meter}>
            <span
              className={styles.indicatorBar_progress}
              style={{ width: '15%', left: '9.45708%' }}
            ></span>
          </div>
        </td>
        <td>
          <div className='tasteStructure_property'>Sweet</div>
        </td>
      </tr>
      {/* 여기서부턴 soft && acidic */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Soft</div>
        </td>
        <td className={styles.tasteStructure_progressBar}>
          <div className={styles.indicatorBar_meter}>
            <span
              className={styles.indicatorBar_progress}
              style={{ width: '15%', left: '64.4675%' }}
            ></span>
          </div>
        </td>
        <td>
          <div className='tasteStructure_property'>Acidic</div>
        </td>
      </tr>
    </tbody>
  </table>
);

const Home = () => {
  //   const [cartItems, setCartItems] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  //   const getArticles = () => {
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_API_URL}/cart?id=1`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setCartItems(
  //           res.data['Show MyCartItem'].map((ele) => {
  //             return ele.article;
  //           })
  //         );
  //       })
  //       .catch((e) => {
  //         console.log('error!:', e);
  //       });
  //   };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  //   useEffect(() => {
  //     getArticles();
  //   }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      // 여기 'prevIndex ===' 다음에 숫자를 원하는 슬라이드 만큼 적으면 된다
      () =>
        setIndex((prevIndex) =>
          prevIndex === wines.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  // useEffect(() => {
  //   console.log('here is index ', document.location.href);
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.intro_container}>
        <div className={styles.intro_message}>
          <div className={styles.separate1}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <h1 className={styles.title_text}>WINE FIND</h1>
          <div className={styles.content_container}>
            <div className={styles.separate}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className={styles.intro_back}>
              <div className={styles.intro_content}>
                <h1>Welcome to WINE FIND</h1>
                <br />
                <br />
                WIne FIne, and you?
                <br />
                <br />
                여러분의 와인지식, 안녕하신가요?
                <br />
                <br />
                누구나 와인을 쉽고 빠르게 배울 수 있습니다. <br />
                <br />
                간단한 테스트를 통해 인생 와인을 찾아드려요!
                <br />
                <br />
                WIne FInd와 함께라면, 여러분은 더이상 와린이가 아닙니다.
                <br />
                <br /> 바로 시작해보세요!
              </div>
            </div>
          </div>
          <div className='text logo'>
            <div
              className={classNames(styles.logo_effect, styles.goToPosition)}
            >
              <div className={classNames(styles.box, styles.fade_in_box)}>
                WI
              </div>
              <div
                className={classNames(
                  styles.box,
                  styles.animated,
                  styles.bounceInLeft
                )}
              >
                NE&nbsp;&nbsp;
              </div>
              <div className={classNames(styles.box, styles.fade_in_box)}>
                FI
              </div>
              <div
                className={classNames(
                  styles.box,
                  styles.animated,
                  styles.bounceInLeft
                )}
              >
                ND
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.learn_container}>
        <div className={styles.slideshow}>
          <div
            className={styles.slideshowSlider}
            style={{ transform: `translate3d(${-index * 100}%,10,0)` }}
          >
            {wines.map((index) => (
              <div className='slide' key={index}>
                <CardCompo wines={wines} />
              </div>
            ))}
          </div>

          <div className={styles.slideshowDots}>
            {wines.map((_, idx) => (
              <div
                // 여기도 숫자를 바꿔서 원하는 슬라이드 만큼 바꿔줘야 한다
                key={idx}
                className={`styles.slideshowDot ${
                  index === idx ? 'active' : ''
                }`}
                onClick={() => {
                  setIndex(idx);
                }}
              >
                <Icon style={{ color: 'white' }} name='circle' />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.learn_container}>
        <div className={styles.learn_image}></div>
        <div className={styles.learn_intro}>
          <p>
            당신에게 잘 맞는 와인은 무엇일까요?
            <br />
            지금 바로 와인 취향 테스트를 해보세요!
            <button>Test Start!</button>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;

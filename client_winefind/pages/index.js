import styles from '../styles/Home.module.css';
import classNames from 'classnames';
import CardCompo from '../components/CardCompo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IndexTest from '../components/IndexTest';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('all articles:', res.data);
        setArticles(res.data);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };
  useEffect(() => {
    getArticles();
  }, []);

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
                <h1 style={{ fontFamily: 'Playfair Display, serif' }}>
                  Welcome to WINE FIND
                </h1>
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
        <div className={styles.learn_head}>
          <h1 className={styles.learn_head}>Most Searched Wines</h1>
        </div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ type: 'fraction' }}
          onSwiper={() => console.log('sliding')}
          // onSlideChange={() => console.log('is moving')}
          style={{
            // border: '5px white solid',
            width: '100%',
            height: '600px',
            color: 'white',
          }}
        >
          {/* 슬라이드 1 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(0, 1)} />
          </SwiperSlide>
          {/* 슬라이드 2 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(1, 2)} />
          </SwiperSlide>
          {/* 슬라이드 3 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(2, 3)} />
          </SwiperSlide>
          {/* 슬라이드 4 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(3, 4)} />
          </SwiperSlide>
          {/* 슬라이드 5 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(4, 5)} />
          </SwiperSlide>
          {/* 슬라이드 6 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(5, 6)} />
          </SwiperSlide>
          {/* 슬라이드 7 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(6, 7)} />
          </SwiperSlide>
          {/* 슬라이드 8 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(7, 8)} />
          </SwiperSlide>
          {/* 슬라이드 9 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(8, 9)} />
          </SwiperSlide>
          {/* 슬라이드 10 */}
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <CardCompo compo={articles.slice(9, 10)} />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.testing_container}>
        <IndexTest />
      </div>
    </div>
  );
};

export default Home;

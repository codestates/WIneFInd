import styles from '../styles/Home.module.css';
import React from 'react';
import router from 'next/router';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardCompo = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
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

  const goToDescription = (ele) => {
    // console.log(ele);
    router.push(`/mall/${ele}`);
  };

  return (
    <>
      {articles.length !== 0 ? (
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ type: 'fraction', clickable: true }}
          onSwiper={() => console.log('sliding')}
          // onSlideChange={() => console.log('is moving')}
          style={{
            // border: '5px white solid',
            width: '100%',
            height: '600px',
            color: 'white',
          }}
        >
          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[0].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[0].wine.wineName}</h2>
              </div>
              <img
                src={articles[0].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[1].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[1].wine.wineName}</h2>
              </div>
              <img
                src={articles[1].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[2].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[2].wine.wineName}</h2>
              </div>
              <img
                src={articles[2].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[3].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[3].wine.wineName}</h2>
              </div>
              <img
                src={articles[3].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[4].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[4].wine.wineName}</h2>
              </div>
              <img
                src={articles[4].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[5].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[5].wine.wineName}</h2>
              </div>
              <img
                src={articles[5].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[6].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[6].wine.wineName}</h2>
              </div>
              <img
                src={articles[6].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[7].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[7].wine.wineName}</h2>
              </div>
              <img
                src={articles[7].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[8].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[8].wine.wineName}</h2>
              </div>
              <img
                src={articles[8].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[9].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[9].wine.wineName}</h2>
              </div>
              <img
                src={articles[9].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>

          <SwiperSlide
            style={{
              display: 'flex',
            }}
          >
            <div
              className={styles.card_height}
              onClick={() => goToDescription(articles[10].id)}
            >
              <div className={styles.card_head}>
                <h2 className='logo text'>{articles[10].wine.wineName}</h2>
              </div>
              <img
                src={articles[10].wine.image}
                className={styles.image_height}
              />
              <img className={styles.bord} src='/images/border.png' />
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className={styles.load_contain}>
          <div className={styles.load}>
            Loading...
            <Icon loading name='spinner' size='big' />
          </div>
        </div>
      )}
    </>
  );
};

export default CardCompo;

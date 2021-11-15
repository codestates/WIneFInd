import styles from '../../styles/Home.module.css';
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

  // 정보 조회 API
  const getArticles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        withCredentials: true,
      })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  // 자세히 보기 페이지로 가기
  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };

  return (
    <>
      {articles.length !== 0 ? (
        <Swiper
          // install Swiper modules
          className={styles.swiper}
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
          pagination={{ color: 'white', clickable: true }}
          onSwiper={() => console.log('sliding')}
          // onSlideChange={() => console.log('is moving')}
          style={{
            width: '100%',
            height: '600px',
            color: 'white',
          }}
        >
          {/* 여기서부터 와인들 id토대로 보여주기 */}
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
                <h2 className='text_color'>{articles[0].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[0].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[1].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[1].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[2].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[2].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[3].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[3].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[4].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[4].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[5].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[5].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[6].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[6].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[7].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[7].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[8].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[8].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>{articles[9].wine.wineName}</h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[9].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
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
                <h2 className='text_color'>
                  {articles[10].wine.wineName.slice(0, 34)}
                </h2>
              </div>
              <div
                style={{
                  backgroundImage: `url(${articles[10].wine.image})`,
                }}
                className={styles.image_height}
              ></div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        // 로딩중이면 로딩 보여주는 섹션
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

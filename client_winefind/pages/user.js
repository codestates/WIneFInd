import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from '../styles/User.module.css';
import Sidebar from '../components/Sidebar';
import { Card, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import Taste from '../components/Taste';
//마이페이지 추천 받은 와인 페이지
const User = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [wineList, setWineList] = useState([]);

  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };
  //로그인 체크 하기
  const checkLogin = () => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(() => true);
        let id = res.data.userInfo.id;
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/recommended?id=${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setWineList(res.data.userRecommended);
          })
          .catch((e) => {
            console.log('No wine List', e);
          });
      })
      .catch((e) => {
        setIsLogin(false);
        console.log('error:', e);
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <div className={classNames('text_eng', styles.container)}>
          <Sidebar />
          <div className={styles.layout}>
            <div className={classNames('text_color', styles.cellar_title)}>
              My Wine Cellar
            </div>
            <div className={styles.card_box}>
              {wineList.length !== 0 ? (
                wineList.map((wine, index) => (
                  <div className={styles.cards} key={index}>
                    <div
                      className={styles.image_height}
                      style={{
                        backgroundImage: `url(${wine.article.wine.image})`,
                      }}
                    ></div>
                    <h3 className='text_color'>{wine.article.wine.wineName}</h3>
                    <span className='date'>
                      {wine.article.wine.type
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(wine.article.wine.type.slice(1))}
                      &nbsp;|&nbsp;&nbsp;{' '}
                      {wine.article.wine.country
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(wine.article.wine.country.slice(1))}
                    </span>
                    <Taste wine={wine.article} />
                    <button
                      onClick={() => goToDescription(wine.article.id)}
                      className={styles.user_btn}
                    >
                      상품 보러 가기
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.no_item}>
                  <div className={styles.no_item_text}>
                    <div className='text_color'>
                      와인 몰에서 내 와인 셀러를 추가하세요!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 로그인 후 서비스 사용 띄우기 */}
          <div className={styles.loginToUse}>
            <div className={styles.logincontent}>
              로그인 후 서비스 사용 가능합니다!
              <br />
              <br />
              <div className={styles.contenttwo}>
                <Icon.Group size='huge'>
                  <Icon loading size='big' name='circle notch' />
                  <Icon name='user' />
                </Icon.Group>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;

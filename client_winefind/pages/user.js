import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

import styles from '../styles/User.module.css';
import Sidebar from '../components/Sidebar';
import { Card } from 'semantic-ui-react';

//마이페이지
const User = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const checkLogin = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        setIsLogin(() => true);
        console.log('islogin?', isLogin);
        console.log('auth:', res.data);
      })
      .catch((e) => {
        setIsLogin(() => false);
        console.log('isLogin', isLogin);
        console.log('error:', e);
      });
  };
  useEffect(() => {
    checkLogin();
  }, []);
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
  return (
    <>
      {isLogin ? (
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.cards_container}>
            <div className={styles.layout}>
              <h1 className='logo text'>My Wine List</h1>
              {/* ====================  첫 번째 카드====================== */}
              <div className={styles.cards}>
                <Card className={styles.card_height}>
                  <img
                    src='images/grand_cru.webp'
                    className={styles.image_height}
                  />
                  <Card.Content>
                    <Card.Header className={styles.card_head}>
                      <h3 className='logo text'>
                        Château Corton Grancey Grand Cru 2015
                      </h3>
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>Louis Latour</span>
                    </Card.Meta>
                    <Card.Description>{taste}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <button className={styles.user_btn}>상품 보러 가기</button>
                  </Card.Content>
                </Card>
              </div>
              {/* ===================두번째 카드====================== */}
              <div className={styles.cards}>
                <Card className={styles.card_height}>
                  <img
                    src='images/vina_ardanza.png'
                    className={styles.image_height}
                  />
                  <Card.Content>
                    <Card.Header className={styles.card_head}>
                      <h3 className='logo text'>Viña Ardanza Reserva 2015</h3>
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>La Rioja Alta</span>
                    </Card.Meta>
                    <Card.Description className={styles.card_descrip}>
                      {taste}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <button className={styles.user_btn}>상품 보러 가기</button>
                  </Card.Content>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>로그인 후 서비스 사용 가능합니다</div>
      )}
    </>
  );
};

export default User;

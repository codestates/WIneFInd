import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

import styles from '../styles/User.module.css';
import Sidebar from '../components/Sidebar';
import { Card, Icon } from 'semantic-ui-react';

//마이페이지
const User = ({ toggleModal }) => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [wineList, setWineList] = useState([]);

  const checkLogin = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        setIsLogin(() => true);
        console.log(res.data.message);
        if (res.data.message === '카카오 회원 로그인 되었습니다.') {
          console.log(res.data['카카오 정보'].id);
          let id = res.data['카카오 정보'].id;
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/recommend?id=${id}`, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data['Show Recommend']);
              setWineList(res.data['Show Recommend']);
            })
            .catch((e) => {
              console.log('No wine List', e);
            });
        }
      })
      .catch((e) => {
        setIsLogin(false);
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
              {wineList
                ? wineList.map((wine, index) => (
                    <div className={styles.cards} key={index}>
                      <Card className={styles.card_height}>
                        <img
                          src={wine.wine.image}
                          className={styles.image_height}
                        />
                        <Card.Content>
                          <Card.Header className={styles.card_head}>
                            <h3 className='logo text'>{wine.wine.wineName}</h3>
                          </Card.Header>
                          <Card.Meta>
                            <span className='date'>
                              {wine.wine.type},{wine.wine.country}
                            </span>
                          </Card.Meta>
                          <Card.Description>{taste}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <button className={styles.user_btn}>
                            상품 보러 가기
                          </button>
                        </Card.Content>
                      </Card>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.logintouse}>
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

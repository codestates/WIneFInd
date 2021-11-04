import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from '../styles/User.module.css';
import Sidebar from '../components/Sidebar';
import { Card, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
//마이페이지 추천 받은 와인 페이지
const User = ({ toggleModal }) => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [wineList, setWineList] = useState([]);

  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };
  //로그인 체크 하기
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
  const goToTop = () => {
    window.scrollTo(0, 10);
  };
  useEffect(() => {
    checkLogin();
    // goToTop();
  }, []);
  // 와인 맛들을 정렬 한 것
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
        <div className={classNames('text_eng', styles.container)}>
          <Sidebar />

          <div className={styles.layout}>
            <div
              className={classNames('text', 'text_eng', styles.cellar_title)}
            >
              My Wine Cellar
            </div>
            {console.log('WhAT???', wineList)}
            <div className={styles.card_box}>
              {wineList
                ? wineList.map((wine, index) => (
                    <div className={styles.cards} key={index}>
                      <div
                        className={styles.image_height}
                        style={{ backgroundImage: `url(${wine.wine.image})` }}
                      ></div>

                      <h3 className='text'>{wine.wine.wineName}</h3>

                      <span className='date'>
                        {wine.wine.type},{wine.wine.country}
                      </span>

                      {taste}

                      <button
                        onClick={() => goToDescription(wine.id)}
                        className={styles.user_btn}
                      >
                        상품 보러 가기
                      </button>
                    </div>
                  ))
                : ''}
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

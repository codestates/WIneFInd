import styles from '../styles/Top.module.css';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import classNames from 'classnames';
import Link from 'next/link';

function Top({ toggleModal, modal }) {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const checkLogin = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then(() => {
        setIsLogin(() => true);
      })
      .catch(() => {
        setIsLogin(() => false);
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        withCredentials: true,
      })
      .then(() => {
        console.log('logout success');
        router.push('/index');
      })
      .catch(() => {
        console.log('logout failed');
        router.push('/index');
      });
  };

  return (
    <>
      <div className={styles.nav_bar_container}>
        <div>
          <Link href='/'>
            <a className={classNames(styles.nav_logo, 'text')}>WIne FInd</a>
          </Link>
        </div>
        <div className={styles.nav_btns}>
          <Link href='/mall'>
            <a className={classNames('text', styles.nav_btn)}>와인 몰</a>
          </Link>
          <Link href='/test'>
            <a className={classNames('text', styles.nav_btn)}>
              와인 취향 테스트
            </a>
          </Link>
          <Link href='/user'>
            <a className={classNames('text', styles.nav_btn)}>
              나만의 와인셀러
            </a>
          </Link>
          {isLogin ? (
            <a
              className={classNames('text', styles.nav_btn)}
              onClick={handleLogout}
            >
              로그아웃
            </a>
          ) : (
            <LoginModal modal={modal} toggleModal={toggleModal} />
          )}
        </div>
      </div>
    </>
  );
}
{
  /* <LoginModal modal={modal} toggleModal={toggleModal} /> */
}
export default Top;

// <div className={styles.top_container}>
//         <div style={{ display: 'flex', marginLeft: '1rem', fontSize: '2rem' }}>
//           <img className={styles.logo} src='/images/logo.png' />
//           &nbsp;&nbsp;
//           <h2 className='text logo'>WIne FInd</h2>
//         </div>
//         <div className={styles.top_bar} >
//           <button className={styles.btn} name='mall' onClick={goLink}>
//             와인 몰
//           </button>
//           <button className={styles.btn} name='test' onClick={goLink}>
//             와인 취향 테스트
//           </button>
//           <button className={styles.btn} name='user' onClick={goLink}>
//             나만의 와인셀러
//           </button>
//           {isLogin ? (
//             <button className={styles.btn} name='logout' onClick={handleLogout}>
//               로그아웃
//             </button>
//           ) : (
//             <LoginModal modal={modal} toggleModal={toggleModal} />
//           )}
//         </div>
//       </div>

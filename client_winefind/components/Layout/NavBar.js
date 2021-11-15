import styles from '../../styles/Top.module.css';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginModal from '../Login/LoginModal';
import classNames from 'classnames';
import Link from 'next/link';

function Top({ toggleModal, modal }) {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const checkLogin = () => {
    let token = localStorage.getItem('winefind');
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
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
    localStorage.removeItem('winefind');
    router.push('/');
    alert('로그아웃 되었습니다');
    window.location.reload();
  };

  const goToUserAndToggleLogin = () => {
    router.push('/user');
    toggleModal();
  };

  return (
    <>
      <div className={styles.nav_bar_container}>
        <div>
          <Link href='/'>
            <a className={classNames('text_color', styles.nav_logo)}>
              WIne FInd
            </a>
          </Link>
        </div>
        <div className={styles.nav_btns}>
          <Link href='/mall'>
            <a
              className={classNames('text_color', 'text_font', styles.nav_btn)}
            >
              와인 몰
            </a>
          </Link>
          <Link href='/test'>
            <a
              className={classNames('text_color', 'text_font', styles.nav_btn)}
            >
              와인 취향 테스트
            </a>
          </Link>
          {isLogin ? (
            <Link href='/user'>
              <a
                className={classNames(
                  'text_color',
                  'text_font',
                  styles.nav_btn
                )}
              >
                나만의 와인셀러
              </a>
            </Link>
          ) : (
            <a
              onClick={goToUserAndToggleLogin}
              className={classNames('text_color', 'text_font', styles.nav_btn)}
            >
              나만의 와인셀러
            </a>
          )}
          {isLogin ? (
            <Link href='/upload'>
              <a
                className={classNames(
                  'text_color',
                  'text_font',
                  styles.nav_btn
                )}
              >
                와인 판매하기
              </a>
            </Link>
          ) : (
            <a
              onClick={toggleModal}
              className={classNames('text_color', 'text_font', styles.nav_btn)}
            >
              와인 판매하기
            </a>
          )}

          {isLogin ? (
            <a
              className={classNames('text_color', 'text_font', styles.nav_btn)}
              onClick={handleLogout}
            >
              로그아웃
            </a>
          ) : (
            <LoginModal modal={modal} toggleModal={toggleModal} />
          )}
        </div>
      </div>
      {/* <div className={styles.shadow}></div> */}
    </>
  );
}
export default Top;

import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Introduction = () => {
  return (
    <div className={styles.intro_container}>
      <div className={styles.intro_message}>
        <div className={styles.separator}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div className={styles.content}>
          <div className={styles.intro_back}>
            <h1 className={styles.intro_title}>
              Welcome to
              <br /> WINE FIND
            </h1>
            <div className={styles.intro_content}>
              <br />
              여러분에게 가장 잘 맞는 와인은 무엇일까요?
              <br />
              <br />
              간단한 테스트를 통해 나만의 인생 와인을 추천 받아보세요!
              <br />
              <br />
              바로 시작해보세요!
            </div>
          </div>
          {/* 취향 테스트 받으러 가는 링크 */}
          <div className={styles.intro_btns}>
            <Link href='/mall'>
              <button type='button' className={styles.btn_mall}>
                직접 와인 고르기
                <i className='big arrow circle right icon' />
              </button>
            </Link>
            <Link href='/test'>
              <button type='button' className={styles.btn_test}>
                취향 테스트하기
                <i className='big arrow circle right icon' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;

import styles from '../../styles/Home.module.css';
import Link from 'next/link';
const IndexTest = () => {
  return (
    // 와인 취향 테스트 받으로 가기 섹션
    <>
      <div className={styles.testing_image}>움짤 여기요</div>
      <div className={styles.testing_intro}>
        <div className={styles.testing_contain}>
          <p className={styles.testing_p}>
            당신에게 잘 맞는 와인은 무엇일까요?
            <br />
            <br />
            지금 바로 와인 취향 테스트를 해보세요!&nbsp;&nbsp;
          </p>
        </div>
        <br />
        {/* 취향 테스트 받으러 가는 링크 */}
        <Link href='/test'>
          <button
            type='button'
            className='btn btn-danger'
            style={{ width: '30%' }}
          >
            <i className='huge arrow circle right icon' />
          </button>
        </Link>
      </div>
    </>
  );
};

export default IndexTest;

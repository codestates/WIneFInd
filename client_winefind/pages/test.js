import Footer from '../components/Footer';
import Top from '../components/Top';
import styles from '../styles/Home.module.css';

const test = () => {
  return (
    <>
      <Top />
      <div className={styles.container}> 와인 취향 테스트 하기</div>
      <Footer />
    </>
  );
};

export default test;

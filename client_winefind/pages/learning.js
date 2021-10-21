import Footer from '../components/Footer';
import Top from '../components/Top';
import styles from '../styles/Home.module.css';

const learning = () => {
  return (
    <>
      <Top />
      <div className={styles.container}> 와인 배우기 페이지</div>
      <Footer />
    </>
  );
};

export default learning;

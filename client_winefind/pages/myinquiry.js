import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Top from '../components/Top';
import styles from '../styles/Home.module.css';
//마이페이지
const myinquiry = () => {
  return (
    <>
      <Top />
      <Sidebar />

      <div className={styles.container} style={{ textAlign: 'center' }}>
        이 페이지는 문의 사항 페이지다ㅏㅏㅏ
      </div>
      <Footer />
    </>
  );
};

export default myinquiry;

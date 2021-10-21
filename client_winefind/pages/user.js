import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Top from '../components/Top';
//마이페이지
const user = () => {
  return (
    <>
      <Top />
      <Sidebar />
      <div className={styles.container} style={{ textAlign: 'center' }}>
        이 페이지는 내 와인 리스틀 보여주는 페이지
      </div>
      <Footer />
    </>
  );
};

export default user;

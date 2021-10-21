import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.css';
//마이페이지
const resign = () => {
  return (
    <>
      <Sidebar />

      <div className={styles.container} style={{ textAlign: 'center' }}>
        이 페이지는 탈뢰 하는 곳
      </div>
    </>
  );
};

export default resign;

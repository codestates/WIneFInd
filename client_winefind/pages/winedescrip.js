import styles from '../styles/Home.module.css';
import Login from '../components/Login';
const shoppinglist = () => {
  return (
    <>
      <div className={styles.container}> 문의하기 페이지</div>
      <Login />
    </>
  );
};

export default shoppinglist;

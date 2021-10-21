import Footer from '../components/Footer';
import Top from '../components/Top';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <>
      <Top />
      <div className={styles.container}>First Page</div>
      <Footer />
    </>
  );
};

export default Home;

import styles from '../styles/Home.module.css';
import 'semantic-ui-css/semantic.min.css';
import Footer from '../components/Footer';
import Top from '../components/Top';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.mainpage_container}>
      <Top />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
export default MyApp;

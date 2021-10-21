import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );

}
export default MyApp;

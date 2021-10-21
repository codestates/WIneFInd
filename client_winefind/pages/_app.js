import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../components/Footer";
import Top from "../components/Top";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
export default MyApp;

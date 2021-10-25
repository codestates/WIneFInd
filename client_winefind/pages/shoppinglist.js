import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Top from "../components/Top";
import styles from "../styles/Home.module.css";
//마이페이지
const shoppinglist = () => {
  return (
    <>
      <div style={{ height: "300rem" }}>
        <Sidebar />
        <div style={{ textAlign: "center" }}>
          이 페이지는 장바구니 페이지다ㅏㅏㅏ
        </div>
      </div>
    </>
  );
};

export default shoppinglist;

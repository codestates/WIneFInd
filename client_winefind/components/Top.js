import styles from "../styles/Top.module.css";
import { useRouter } from "next/dist/client/router";
import { Menu, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

function Top({ toggleModal, modal }) {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const checkLogin = () => {
    axios
      .get("https://localhost:4000/auth", { withCredentials: true })
      .then((res) => {
        setIsLogin(() => true);
        console.log("islogin?", isLogin);
        console.log("auth:", res.data);
      })
      .catch((e) => {
        setIsLogin(() => false);
        console.log("isLogin", isLogin);
        console.log("error:", e);
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = () => {
    axios
      .get("https://localhost:4000/logout", { withCredentials: true })
      .then((res) => {
        // setUserinfo({
        //   email: "",
        //   username: "",
        //   birth: "",
        //   userId: 0,
        // });
        // setIsLogin(false);
        // history.push("/");
        console.log("logout success");
      })
      .then(() => {
        router.push("/index");
      });
  };

  function goLink(event) {
    if (event.target.name === "mall") {
      router.push("/mall");
    } else if (event.target.name === "test") {
      router.push("/test");
    } else if (event.target.name === "user") {
      router.push("/user");
      if (isLogin === false) {
        toggleModal();
      }
    } else {
    }
  }

  return (
    <>
      <div className={styles.top_container}>
        <div style={{ display: "flex", marginLeft: "60px", fontSize: "35px" }}>
          <img className={styles.logo} src="/images/logo.png" />
          &nbsp;&nbsp;
          <h2 className="text logo">WIne FInd</h2>
        </div>
        <div>
          <button className={styles.btn} name="mall" onClick={goLink}>
            와인 몰
          </button>
          <button className={styles.btn} name="test" onClick={goLink}>
            와인 취향 테스트
          </button>
          <button className={styles.btn} name="user" onClick={goLink}>
            나만의 와인셀러
          </button>
          {isLogin ? (
            <button className={styles.btn} name="logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <LoginModal modal={modal} toggleModal={toggleModal} />
          )}
        </div>
      </div>
    </>
  );
}

export default Top;

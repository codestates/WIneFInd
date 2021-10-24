import styles from "../styles/Top.module.css";
import { useRouter } from "next/dist/client/router";
import { Menu, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import LoginModalForm from "./LoginModalForm";

function Top() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  let activeItem;

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
      });
  };

  if (router.pathname === "/user") {
    activeItem = "user";
  } else if (router.pathname === "/learning") {
    activeItem = "learning";
  } else if (router.pathname === "/test") {
    activeItem = "test";
  } else if (router.pathname === "/board") {
    activeItem = "logout";
  } else if (router.pathname === "/logout") {
    activeItem = "logout";
  }

  function goLink(e, data) {
    if (data.name === "mall") {
      router.push("/mall");
    } else if (data.name === "test") {
      router.push("/test");
    } else if (data.name === "user") {
      router.push("/user");
    } else if (data.name === "logout") {
      router.push("/index");
    }
  }

  return (
    <>
      <div className={styles.top_container}>
        <div style={{ display: "flex", marginLeft: "60px", fontSize: "35px" }}>
          <img className={styles.logo} src="/images/logo.png" />
          &nbsp;&nbsp;
          <h2 style={{ fontFamily: "Raleway" }}>WIne FInd</h2>
        </div>
        <Segment inverted style={{ backgroundColor: "transparent" }}>
          <Menu
            pointing
            secondary
            inverted
            style={{
              borderColor: "transparent",
              marginRight: "60px",
              fontSize: "18px",
            }}
          >
            <Menu.Item
              name="mall"
              active={activeItem === "mall"}
              onClick={goLink}
            >
              <p style={{ fontWeight: "bold" }}>와인 몰</p>
            </Menu.Item>
            <Menu.Item
              name="test"
              active={activeItem === "test"}
              onClick={goLink}
            >
              <p style={{ fontWeight: "bold" }}>와인 취향 테스트</p>
            </Menu.Item>

            <Menu.Item
              name="user"
              active={activeItem === "user"}
              onClick={goLink}
            >
              <p style={{ fontWeight: "bold" }}>나만의 와인 셀러</p>
            </Menu.Item>
            {isLogin ? (
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={goLink}
              >
                <Icon name="log out" />
                <p onClick={handleLogout} style={{ fontWeight: "bold" }}>
                  Logout
                </p>
              </Menu.Item>
            ) : (
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={goLink}
              >
                <LoginModal />
              </Menu.Item>
            )}
          </Menu>
        </Segment>
      </div>
    </>
  );
}

export default Top;

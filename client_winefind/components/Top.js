
import styles from "../styles/Top.module.css";
import { useRouter } from "next/dist/client/router";
import { Menu, Segment, Icon } from "semantic-ui-react";


function Top() {
  const router = useRouter();
  let activeItem;


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
    if (data.name === "user") {
      router.push("/user");
    } else if (data.name === "learning") {
      router.push("/learning");
    } else if (data.name === "test") {
      router.push("/test");
    } else if (data.name === "board") {
      router.push("/board");
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
        <Segment inverted style={{ backgroundColor: 'transparent' }}>
          <Menu
            pointing
            secondary
            inverted
            style={{
              borderColor: 'transparent',
              marginRight: '60px',
              fontSize: '18px',
            }}
          >
            <Menu.Item
              name='learning'
              active={activeItem === 'learning'}
              onClick={goLink}
            >
              <p style={{ fontWeight: 'bold' }}>와인 배우기</p>
            </Menu.Item>
            <Menu.Item
              name='test'
              active={activeItem === 'test'}
              onClick={goLink}
            >
              <p style={{ fontWeight: 'bold' }}>와인 취향 테스트</p>
            </Menu.Item>
            <Menu.Item
              name='user'
              active={activeItem === 'user'}
              onClick={goLink}
            >
              <p style={{ fontWeight: 'bold' }}>나만의 와인 셀러</p>
            </Menu.Item>
            <Menu.Item

              name="board"
              active={activeItem === "board"}
              onClick={goLink}
            >
              <p style={{ fontWeight: "bold" }}>우리들의 와인 셀러</p>
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}

              onClick={goLink}
            >
              <Icon name='log out' />
              <p style={{ fontWeight: 'bold' }}>Logout</p>
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    </>
  );
}

export default Top;

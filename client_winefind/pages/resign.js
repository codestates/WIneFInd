import Sidebar from "../components/Sidebar";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Icon, Button, Sticky } from "semantic-ui-react";
//마이페이지
const resign = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal === true) {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
    });
  } else {
    useEffect(() => {
      document.body.style.overflowY = "scroll";
    });
  }

  function goLink() {
    router.push("/index");
  }

  return (
    <>
      <Sidebar />
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <h2 style={{ color: "red", fontWeight: "bold" }}>
          <Icon name="warning sign" size="huge" />
          Warning!!
        </h2>{" "}
        <br />
        <h2 style={{ fontWeight: "bold" }}>
          All of your Information will be Deleted!!
        </h2>
      </div>
      <button onClick={toggleModal} className={styles.btn_resign}>
        Delete Account
      </button>
      {modal && (
        <div className={styles.resign}>
          <div onClick={toggleModal} className={styles.resign_overlay}></div>
          <div className={styles.resign_contents}>
            <div>
              <h2
                style={{
                  display: "flex",
                  padding: "2rem",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Are you Sure you want to Delete this Account?
              </h2>
              <img
                style={{
                  display: "flex",
                  marginLeft: "15rem",
                  width: "100px",
                }}
                src="/images/logo.png"
              />
            </div>
            <div
              onClick={goLink}
              style={{
                display: "flex",
                fontWeight: "bold",
                color: "blue",
                cursor: "pointer",
                marginLeft: "15rem",
                marginBottom: "5px",
              }}
            >
              <Button color="black">Delete Account</Button>
            </div>

            <p style={{ display: "flex", marginLeft: "10rem" }}>
              Copyright ⓒ 2021. Apoint. All rights reserved.
            </p>

            <Icon
              name="window close"
              className={styles.close_modal}
              onClick={toggleModal}
            />
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default resign;

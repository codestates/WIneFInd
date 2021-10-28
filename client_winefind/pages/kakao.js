import axios from "axios";
import router, { withRouter } from "next/router";
import { useEffect, useState } from "react";

const kakao = () => {
  useEffect(() => {
    let code = document.location.href.slice(34);
    if (code) {
      axios
        .get(`https://localhost:4000/kakao?code=${code}`, {
          withCredentials: true,
        })
        .then(() => {
          // router.push("https://localhost:3000/index");
          router.back();
          console.log("kakao login success");
        })
        .catch((e) => {
          console.log("get kakao api failed:", e);
          router.back();
          // router.push("https://localhost:3000/index");
        });
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <img src="images/loading.gif" />
    </div>
  );
};

export default kakao;

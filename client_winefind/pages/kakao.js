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
          router.push("https://localhost:3000/index");
          console.log("kakao login success");
        })
        .catch((e) => {
          console.log("get kakao api failed:", e);
        });
    } else {
      console.log("there is no code");
    }
  }, []);
  return <div>HI~</div>;
};

export default kakao;

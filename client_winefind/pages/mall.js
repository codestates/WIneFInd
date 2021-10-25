import styles from "../styles/Mall.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Article from "../components/Article";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";

const mall = () => {
  const [articles, setArticles] = useState([]);
  //Article Get Api로 articles에 게시글 목록 넣기

  const getArticles = () => {
    axios
      .get("https://localhost:4000/article", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((e) => {
        console.log("error!:", e);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.mall_container}>
      <div>
        <input className={styles.search_bar} type="search" />
      </div>
      <div className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big, "text")}>와인 리스트</div>
          <Article articles={articles} />
        </div>
        <div className={styles.filter_box}>
          <div className="text">필터</div>
          <div className={styles.wine_type}>와인 종류</div>
        </div>
      </div>
    </div>
  );
};

export default mall;

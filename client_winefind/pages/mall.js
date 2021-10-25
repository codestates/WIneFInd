import styles from "../styles/Mall.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Article from "../components/Article";
import classNames from "classnames";

const mall = () => {
  const [articles, setArticles] = useState([]);

  //Article Get Api로 articles에 게시글 목록 넣기

  // const getArticles = () => {
  //   axios
  //     .get("https://localhost:4000/article", { withCredentials: true })
  //     .then((res) => {
  //       console.log("Get Article Success:", res);
  //     })
  //     .then((res) => {
  //       setArticles((res) => res.data);
  //     });
  // };

  // useEffect(() => {
  //   getArticles();
  // }, []);

  return (
    <div className={styles.mall_container}>
      <div className={styles.search_bar}>
        <div class="input-group">
          <div class="form-outline">
            <input
              id="search-focus"
              type="search"
              id="form1"
              class="form-control"
            />
            <label class="form-label" for="form1">
              Search
            </label>
          </div>
          <button type="button" class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big, "text")}>와인 리스트</div>
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />
          <Article />

          {/* {articles.length === 0 ? (
          <div>No Articles</div>
        ) : (
          articles.map((article) => {
            <Article article={article} />;
          })
        )} */}
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

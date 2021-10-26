import styles from "../styles/Mall.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Article from "../components/Article";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { FormRadio } from "semantic-ui-react";

const mall = () => {
  const [articles, setArticles] = useState([]);
  //Article Get Api로 articles에 게시글 목록 넣기
  const filterConditionList = [];

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

  const findWineWithText = () => {
    //입력받은 텍스트로 와인 찾기.
  };

  const addToFilterCondition = (e) => {
    if (!filterConditionList.includes(e.target.innerText)) {
      filterConditionList.push(e.target.innerText);
    }
    console.log(filterConditionList);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.mall_container}>
      <div>
        <input
          className={styles.search_bar}
          placeholder="   Find Your Wine!"
          type="search"
        />

        <img
          style={{ width: "20px", position: "relative", right: "45px" }}
          src="images/search.png"
        />
      </div>
      <div className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big)}>Wine List</div>
          <Article articles={articles} />
        </div>
        <div className={styles.filter_box}>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>필터</div>
              <div>
                <input type="reset" value="모두 삭제" />
              </div>
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>종류</div>
            </div>
            <div className={styles.filter_type}>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                레드
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                화이트
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                로제
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                스파클링
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                기타
              </button>
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>국가</div>
            </div>
            <div className={styles.filter_type}>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                프랑스
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                이탈리아
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                스페인
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                뉴질랜드
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                미국
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                호주
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                칠레
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                독일
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                아르헨티나
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                남아공
              </button>
              <button
                className={styles.filter_button}
                onClick={addToFilterCondition}
              >
                기타
              </button>
            </div>
          </div>
          <div className={styles.filter_content}>
            맛
            <input type="range" />
            당도
          </div>
          <div className={styles.filter_content}>와인 종류</div>
        </div>
      </div>
    </div>
  );
};

export default mall;

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
  let types = ["레드", "화이트", "로제", "스파클링"];
  let countries = [
    "프랑스",
    "이탈리아",
    "스페인",
    "뉴질랜드",
    "미국",
    "호주",
    "칠레",
    "독일",
    "아르헨티나",
    "남아공",
  ];
  let taste = ["acidity", "sweetness", "body", "tannic"];
  let filterConditionList = {
    types: [],
    countries: [],
    sweetness: [],
    acidity: [],
    body: [],
    tannic: [],
    price: [],
  };
  //price 밑으로 찾기.

  const [condition, setCondition] = useState([]);

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

  let list;

  const addToFilterCondition = (e) => {
    let ele = e.target.innerText;
    if (types.includes(ele)) {
      if (!filterConditionList.types.includes(ele)) {
        filterConditionList.types.push(ele);
      }
    }
    if (countries.includes(ele)) {
      if (!filterConditionList.countries.includes(ele)) {
        filterConditionList.countries.push(ele);
      }
    }
    list = Object.values(filterConditionList).flat();
    console.log("condition:", list);
    console.log(filterConditionList);
  };

  const handleInputValue = (e) => {
    let key = e.target.name;
    filterConditionList[key][0] = e.target.value;
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
            <div>aaa</div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>종류</div>
            </div>
            <div className={styles.filter_type}>
              {types.map((type, index) => (
                <button
                  className={styles.filter_button}
                  onClick={addToFilterCondition}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>국가</div>
            </div>
            <div className={styles.filter_type}>
              {countries.map((country, index) => (
                <button
                  className={styles.filter_button}
                  onClick={addToFilterCondition}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>맛</div>
            </div>
            <div className={styles.filter_type}>
              {taste.map((ele, index) => (
                <div className={styles.filter_taste}>
                  <div>{ele}</div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    name={ele}
                    onInput={handleInputValue}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>가격</div>
            </div>
            <div className={styles.filter_price}>
              <input
                style={{ width: "300px" }}
                type="range"
                min="0"
                max="1000000"
                name="price"
                onInput={handleInputValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mall;

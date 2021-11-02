import styles from '../styles/Mall.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Dropdown } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
const Mall = ({ toggleModal }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  //Article Get Api로 articles에 게시글 목록 넣기
  let types = ['red', 'white', 'rose', 'sparkling'];
  let countries = [
    'France',
    'Italy',
    'Spain',
    'New Zealand',
    'USA',
    'Australia',
    'Chile',
    'Germany',
    'Argentina',
    'Republic of South Africa',
  ];
  let taste = ['acidity', 'sweetness', 'body', 'tannic'];

  let filterConditionList = {
    types: [],
    countries: [],
    sweetness: [],
    acidity: [],
    body: [],
    tannic: [],
    price: [],
  };
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const getFilteredList = () => {
    let typeslist = [];
    let countrieslist = [];
    let sweetnesslist = [];
    let aciditylist = [];
    let bodylist = [];
    let tanniclist = [];
    let pricelist = [];

    for (let ele of list) {
      if (types.includes(ele)) {
        typeslist.push(ele);
      } else if (countries.includes(ele)) {
        countrieslist.push(ele);
      } else if (ele.slice(0, 5) === 'sweet') {
        sweetnesslist.push(ele);
      } else if (ele.slice(0, 7) === 'acidity') {
        aciditylist.push(ele);
      } else if (ele.slice(0, 4) === 'body') {
        bodylist.push(ele);
      } else if (ele.slice(0, 6) === 'tannic') {
        tanniclist.push(ele);
      }
    }
    const searchParam = {
      typeslist: typeslist.join(','),
      countrieslist: countrieslist.join(','),
      sweetnesslist: sweetnesslist.join(','),
      aciditylist: aciditylist.join(','),
      bodylist: bodylist.join(','),
      tanniclist: tanniclist.join(','),
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/article`,
        { params: searchParam },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('SUCCESS, NOW GET NEW DATA!!!');
        console.log('???:', res);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  const getArticles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('all articles:', res.data);
        setArticles(res.data);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };
  const getArticlesPage = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/article?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('this page data:', res.data);
        setArticles(res.data);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  const findWineWithText = () => {
    //입력받은 텍스트로 와인 찾기.
  };

  const [list, setList] = useState([]);

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

    setList(list.concat(Object.values(filterConditionList)).flat());
  };

  const handleInputValue = (e) => {
    let key = e.target.name;
    if (key === 'sweetness') {
      filterConditionList[key][0] = 'sweetness' + e.target.value;
    } else if (key === 'acidity') {
      filterConditionList[key][0] = 'acidity' + e.target.value;
    } else if (key === 'body') {
      filterConditionList[key][0] = 'body' + e.target.value;
    } else if (key === 'tannic') {
      filterConditionList[key][0] = 'tannic' + e.target.value;
    } else {
      filterConditionList[key][0] = e.target.value;
    }
  };

  const eraseAll = () => {
    setList([]);
  };
  const eraseThis = (e) => {
    let erase_target = e.target.innerText;
    let new_list = list.filter((item) => item !== erase_target);
    setList(new_list);
  };

  const goToUpload = () => {
    axios
      .get('https://localhost:4000/auth', { withCredentials: true })
      .then((res) => {
        console.log('logined');
        router.push('/upload');
      })
      .catch((e) => {
        console.log('not Logined');
        toggleModal();
      });
  };

  useEffect(() => {
    getArticlesPage();
  }, [page]);

  return (
    <div className={styles.mall_container}>
      <div className={styles.mall_top}>
        <input
          className={styles.search_bar}
          placeholder='Find Your Wine!'
          type='search'
        />
        <img
          style={{
            width: '20px',
            height: '20px',
            position: 'relative',
            right: '50px',
          }}
          src='images/search.png'
        />
        <div className={styles.uploadButton}>
          <Button onClick={goToUpload} animated>
            <Button.Content style={{ width: '4.6rem' }} visible>
              게시글 작성
            </Button.Content>
            <Button.Content hidden>Upload</Button.Content>
          </Button>
        </div>
      </div>
      <div className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={styles.text_and_sort}>
            <div className={styles.text_big}>전체 와인({articles.length})</div>
            <form>
              <select style={{ padding: '0.4rem' }}>
                {/* onchange로 api 호출 */}
                <option value='최신등록순'>최신등록순</option>
                <option value='가격낮은순'>가격낮은순</option>
                <option value='가격높은순'>가격높은순</option>
                <option value='평점순'>평점순</option>
              </select>
            </form>
          </div>
          {articles.length !== 0 ? (
            <Article articles={articles} />
          ) : (
            <div>Loading Something</div>
          )}
          <div className={styles.page}>
            <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={20}
              pageRangeDisplayed={5}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <div className={styles.filter_box}>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>필터</div>
              <div>
                <button onClick={getFilteredList}>필터 적용</button>
              </div>
              <div>
                <input type='reset' value='모두 삭제' onClick={eraseAll} />
              </div>
            </div>
            <div>
              {list !== undefined
                ? [...new Set(list)].map((ele, index) => (
                    <button
                      key={index}
                      onClick={eraseThis}
                      className={styles.filter_button}
                    >
                      {ele}
                    </button>
                  ))
                : null}
            </div>
          </div>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>종류</div>
            </div>
            <div className={styles.filter_type}>
              {types.map((type, index) => (
                <button
                  key={index}
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
                  key={index}
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
                <div key={index} className={styles.filter_taste}>
                  <div>{ele}</div>
                  <input
                    type='range'
                    min='0'
                    max='4'
                    step='1'
                    name={ele}
                    onClick={addToFilterCondition}
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
                style={{ width: '300px' }}
                type='range'
                min='0'
                max='1000000'
                name='price'
                onClick={addToFilterCondition}
                onInput={handleInputValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mall;

import styles from '../styles/Mall.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import FilterList from '../components/FilterList';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import classNames from 'classnames';

const Mall = ({ toggleModal }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(null);
  const [searchText, setSearchText] = useState(null);
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
    'Hungary',
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
    setPage(page - 1);
  };

  const getArticlesPage = () => {
    let typesList = '';
    let countriesList = '';
    let sweetnessList = '';
    let acidityList = '';
    let bodyList = '';
    let tannicList = '';
    // let priceList = '';

    for (let ele of [...new Set(list)]) {
      if (types.includes(ele)) {
        typesList += `${ele},`;
      } else if (countries.includes(ele)) {
        countriesList += `${ele},`;
      } else if (ele.slice(0, 5) === 'sweet') {
        sweetnessList += `${ele[ele.length - 1]},`;
      } else if (ele.slice(0, 7) === 'acidity') {
        acidityList += `${ele[ele.length - 1]},`;
      } else if (ele.slice(0, 4) === 'body') {
        bodyList += `${ele[ele.length - 1]},`;
      } else if (ele.slice(0, 6) === 'tannic') {
        tannicList += `${ele[ele.length - 1]},`;
      }
    }

    function eraseComma(ele) {
      if (ele[ele.length - 1] === ',') {
        return ele.slice(0, ele.length - 1);
      }
      return ele;
    }
    typesList = eraseComma(typesList);
    countriesList = eraseComma(countriesList);
    sweetnessList = eraseComma(sweetnessList);
    acidityList = eraseComma(acidityList);
    bodyList = eraseComma(bodyList);
    tannicList = eraseComma(tannicList);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/article?page=${page}&typesList=${typesList}&countriesList=${countriesList}&sweetnessList=${sweetnessList}&acidityList=${acidityList}&bodyList=${bodyList}&tannicList=${tannicList}&priceList=`;

    if (searchText !== null) {
      url += `&text=${searchText}`;
    }
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalArticles(res.data.articlesInfo.totalElements);
        // console.log('this page data:', res.data.articlesInfo.content);
        setArticles(res.data.articlesInfo.content);
      })
      .catch((e) => {
        console.log('error!:', e);
        setPage(0);
      });
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const [list, setList] = useState([]);

  const addToFilterCondition = (e) => {
    let ele = e.target.innerText;
    if (types.includes(ele)) {
      if (!filterConditionList.types.includes(ele)) {
        filterConditionList.types.push(ele);
      }
    } else if (countries.includes(ele)) {
      if (!filterConditionList.countries.includes(ele)) {
        filterConditionList.countries.push(ele);
      }
    } else {
      let keyType = e.target.name;
      if (keyType === 'sweetness') {
        filterConditionList[keyType][0] = 'sweetness' + e.target.value;
      } else if (keyType === 'acidity') {
        filterConditionList[keyType][0] = 'acidity' + e.target.value;
      } else if (keyType === 'body') {
        filterConditionList[keyType][0] = 'body' + e.target.value;
      } else if (keyType === 'tannic') {
        filterConditionList[keyType][0] = 'tannic' + e.target.value;
      } else {
        filterConditionList[keyType][0] = e.target.value;
      }
    }
    setList(list.concat(Object.values(filterConditionList)).flat());
  };

  const handleInputValue = (e) => {
    let keyType = e.target.name;
    if (keyType === 'sweetness') {
      filterConditionList[keyType][0] = 'sweetness' + e.target.value;
    } else if (keyType === 'acidity') {
      filterConditionList[keyType][0] = 'acidity' + e.target.value;
    } else if (keyType === 'body') {
      filterConditionList[keyType][0] = 'body' + e.target.value;
    } else if (keyType === 'tannic') {
      filterConditionList[keyType][0] = 'tannic' + e.target.value;
    } else {
      filterConditionList[keyType][0] = e.target.value;
    }
  };

  const eraseAll = () => {
    setList([]);
    //배포할때
    window.location.replace(`${process.env.NEXT_PUBLIC_CLIENT_URL}/mall.html`);
    //개발할때
    // window.location.reload();
  };
  const eraseThis = (e) => {
    let erase_target = e.target.innerText;
    let erase_icon = e.target.outerHTML.split('"')[1];
    let new_list = list.filter((item) => item !== erase_target);
    new_list = list.filter((item) => item !== erase_icon);
    setList(new_list);
  };

  useEffect(() => {
    getArticlesPage();
  }, [page]);

  return (
    <div className={classNames('text_font', styles.mall_container)}>
      <div className={styles.main_box}>
        <div className={styles.searchAndWineList_box}>
          <div className={styles.top_banner}>
            <img
              style={{ width: '57rem', height: '170px' }}
              src='images/winebanner2.gif'
            />
          </div>
          <div className={styles.mall_top}>
            <input
              className={styles.search_bar}
              placeholder='Find Your Wine!'
              type='search'
              onChange={handleSearchText}
            />
            <img
              style={{
                width: '20px',
                height: '20px',
                position: 'relative',
                right: '50px',
                cursor: 'pointer',
              }}
              onClick={getArticlesPage}
              src='images/search.png'
            />
          </div>
          <div className={styles.mall_content_box}>
            <div className={styles.text_and_sort}>
              <div className={styles.text_big}>
                {console.log('=========', articles)}
                전체 와인({totalArticles})
              </div>
            </div>
            {articles.length !== 0 ? (
              <Article articles={articles} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                찾으시는 와인이 없습니다.
                <img src='images/loading.gif' style={{ width: '550px' }} />
              </div>
            )}
            <div style={{ marginTop: '10px' }}>- {page + 1} -</div>
            <div className={styles.page}>
              <Pagination
                activePage={page + 1}
                itemsCountPerPage={5}
                totalItemsCount={totalArticles}
                pageRangeDisplayed={5}
                prevPageText={'‹'}
                nextPageText={'›'}
                onChange={handlePageChange}
                // forcePage={page}
              />
            </div>
          </div>
        </div>
        <div className={styles.filter_box}>
          <div className={styles.filter_top_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>필터</div>
              <div className={styles.redo_box} onClick={getArticlesPage}>
                <Icon name='filter' />
                <input className={styles.redo} type='reset' value='필터 적용' />
              </div>
              <div className={styles.redo_box} onClick={eraseAll}>
                <Icon name='redo' />
                <input className={styles.redo} type='reset' value='초기화' />
              </div>
            </div>
            <div className={styles.filter_container}>
              {/* {console.log('this is filter list,', [...new Set(list)])} */}
              {list !== undefined
                ? [...new Set(list)].map((ele, index) => (
                    <FilterList ele={ele} key={index} eraseThis={eraseThis} />
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
                  // onClick={addToFilterCondition}
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
                  <div>
                    {ele.slice(0, 1).toUpperCase().concat(ele.slice(1))}
                  </div>
                  <br />
                  <input
                    className={styles.taste_input}
                    type='range'
                    min='0'
                    max='4'
                    step='1'
                    name={ele}
                    onChange={addToFilterCondition}
                    // onInput={handleInputValue}
                  />
                  <div className={styles.seperator}>
                    <div>0</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>가격(₩)</div>
            </div>
            <div className={styles.filter_price}>
              <div style={{ display: 'flex' }}>
                <input
                  className={styles.price_box}
                  type='number'
                  step='10000'
                  min='10000'
                  defaultValue='10000'
                />
                <div style={{ width: '30px' }}>이상</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <input
                  className={styles.price_box}
                  type='number'
                  step='10000'
                  min='10000'
                  defaultValue='10000'
                />
                <div style={{ width: '30px' }}>이하</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Mall;

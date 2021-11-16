import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import styles from '../styles/Shoppinglist.module.css';
import classNames from 'classnames';
import OrderTotal from '../components/Cart/OrderTotal';
import axios from 'axios';
import ArticleCart from '../components/Cart/ArticleCart';

//마이페이지
const Shoppinglist = () => {
  const [cartItems, setCartItems] = useState([]);

  const [userInfo, setUserInfo] = useState(null);
  //checked Items는 배열로 선택된 애들을 담아준다. 체크된 애들만 숫자로 배열에 담아준다.
  const [checkedItems, setCheckedItems] = useState(cartItems);
  // 와인 몰에서 와인을 추가 했을시
  //Article Get Api로 articles에 게시글 목록 넣기 API

  const getArticles = () => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        let id = res.data.userInfo.id;
        setUserInfo(res.data.userInfo);
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/cart?id=${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setCartItems(res.data.cartInfo.map((ele) => ele.article));
            setCheckedItems(res.data.cartInfo.map((ele) => ele.article));
          })
          .catch((e) => {
            console.log('There is no Article:', e);
          });
      })
      .catch((e) => console.log('Plz login:', e));
  };
  // 모든 아이템들을 체크 하기
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems);
    } else {
      setCheckedItems([]);
    }
  };
  // 각 아이템의 체크 기능 함수
  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([
        ...checkedItems,
        ...cartItems.filter((el) => el.id === id),
      ]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el.id !== id));
    }
  };
  // 지우기 기능 API
  const handleDelete = (articleId) => {
    let token = localStorage.getItem('winefind');
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        let id = res.data.userInfo.id;
        let url = `${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`;
        if (articleId === undefined) {
          //all delete
        } else {
          url += `?articleId=${articleId}`;
        }
        axios
          .delete(url, {
            withCredentials: true,
          })
          .then((res) => {
            // 배포할때;
            window.location.replace(
              `${process.env.NEXT_PUBLIC_CLIENT_URL}/shoppinglist.html`
            );
            //개발할때
            // window.location.reload();
          })
          .catch((e) => {
            console.log('err:', e);
          });
      })
      .catch((e) => {
        console.log('not login:', e);
      });
  };
  // 총합 구하는 함수
  const getTotalPrice = () => {
    let totalprice = 0;
    let box = [];
    let tool = '';
    if (checkedItems.length !== 0) {
      for (let i of checkedItems) {
        box = cartItems.filter((el) => el.id === i.id)[0].wine.price.split(',');
        for (let i of box) {
          tool += i;
        }
        totalprice += Number(tool);
        box = [];
        tool = '';
      }
    }
    return totalprice;
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className={styles.mall_container}>
      <Sidebar />
      {/* 장바구니에 아이템들을 보기 */}
      <div className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={styles.text_and_allcheck}>
            <div className={classNames(styles.text_big, 'text_eng')}>
              My Cart
            </div>

            <div>
              <input
                type='checkbox'
                checked={
                  checkedItems.length === cartItems.length ? true : false
                }
                onChange={(e) => handleAllCheck(e.target.checked)}
              ></input>
              <label>&nbsp;&nbsp;전체선택</label>
            </div>
          </div>

          {!cartItems.length ? (
            <div className={styles.no_cartItems}>
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '95%',
              }}
            >
              {cartItems.map((item, idx) => {
                return (
                  <ArticleCart
                    key={idx}
                    item={item}
                    checkedItems={checkedItems}
                    handleCheckChange={handleCheckChange}
                    handleDelete={handleDelete}
                  />
                );
              })}
              <button
                style={{
                  display: 'flex',
                  alignSelf: 'flex-end',
                  margin: '20px 50px',
                  border: 0,
                  outline: 0,
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}
                onClick={() => handleDelete()}
              >
                전체 삭제&nbsp;&nbsp;
                <img
                  src='images/bin.png'
                  style={{
                    width: '20px',
                  }}
                />
              </button>
            </div>
          )}
        </div>

        {/* 총합 아이템들 보여주기 */}
        <div className={styles.filter_box}>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>
                {checkedItems.length !== 0 ? (
                  <OrderTotal
                    total={() => getTotalPrice()}
                    totalQty={checkedItems.length}
                    checkedItems={checkedItems}
                    userInfo={userInfo}
                  />
                ) : (
                  <div className={classNames('text_eng', styles.bill_cart)}>
                    Cart is Empty
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppinglist;

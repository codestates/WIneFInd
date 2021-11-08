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

  //checked Items는 배열로 선택된 애들을 담아준다. 체크된 애들만 숫자로 배열에 담아준다.
  const [checkedItems, setCheckedItems] = useState(
    cartItems.map((el) => el.id)
  );
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
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/cart?id=${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log('hi~,', res.data.cartInfo);
            setCartItems(res.data.cartInfo.map((ele) => ele.article));
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
      setCheckedItems(cartItems.map((el) => el.id));
    } else {
      setCheckedItems([]);
    }
  };
  // 각 아이템의 체크 기능 함수
  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
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
            //배포할때
            // window.location.replace(
            //   'http://mywinefindbucket.s3-website.ap-northeast-2.amazonaws.com/shoppinglist.html'
            // );
            window.location.reload();
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
        // totalprice += Number(
        box = cartItems.filter((el) => el.id === i)[0].wine.price.split(',');
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
      <div horizontal='true' className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big)}>장바구니</div>
          <input
            type='checkbox'
            checked={checkedItems.length === cartItems.length ? true : false}
            onChange={(e) => handleAllCheck(e.target.checked)}
          ></input>
          <label>전체선택</label>
          <button onClick={() => handleDelete()}>전체삭제</button>

          {!cartItems.length ? (
            <div id='item-list-text' className={styles.no_cartItems}>
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
            <div id='cart-item-list'>
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
                  />
                ) : (
                  <div style={{ fontFamily: 'Playfair Display, serif' }}>
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

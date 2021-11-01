import Sidebar from '../components/Sidebar';
import { Card } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import styles from '../styles/Shoppinglist.module.css';
import classNames from 'classnames';
import Article from '../components/Article';
import OrderTotal from '../components/OrderTotal';
import axios from 'axios';
import ArticleCart from '../components/ArticleCart';

//마이페이지
const Shoppinglist = () => {
  const [cartItems, setCartItems] = useState([]);

  //checked Items는 배열로 선택된 애들을 담아준다. 체크된 애들만 숫자로 배열에 담아준다.
  const [checkedItems, setCheckedItems] = useState(
    cartItems.map((el) => el.id)
  );
  // 와인 몰에서 와인을 추가 했을시
  //Article Get Api로 articles에 게시글 목록 넣기

  //카카오 auth 명령으로 내 id 받아와야해요 민쥰님!!
  const getMyId = () => {};
  const getArticles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/cart?id=1`, {
        withCredentials: true,
      })
      .then((res) => {
        setCartItems(
          res.data['Show MyCartItem'].map((ele) => {
            return ele.article;
          })
        );
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems.map((el) => el.id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.splice(id));
  };

  const getTotalPrice = () => {
    let totalprice = 0;
    if (checkedItems.length !== 0) {
      for (let i of checkedItems) {
        totalprice += Number(
          cartItems.filter((el) => el.id === i)[0].wine.price
        );
      }
    }
    return totalprice;
  };

  // const getTotal = () => {
  //   let cartIdArr = checkedItems;
  //   for (let i = 0; i < cartIdArr.length; i++) {
  //     if (cartItems.length !== 0) {
  //       let money = cartItems.filter((el) => el.id === cartItems[i].id)[0].wine
  //           .price,
  //       setTotal({
  //         price: cartItems.filter((el) => el.id === cartItems[i].id)[0].wine
  //           .price,
  //       });
  //       console.log('i am the price', price);
  //       total.price = total.price + Number(price);
  //       total.quantity = total.quantity + 1;
  //     }
  //     return total;
  //   }
  // };

  return (
    <div className={styles.mall_container}>
      {console.log('get data:', cartItems)}
      <Sidebar />
      <div horizontal='true' className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big)}>장바구니</div>
          <input
            type='checkbox'
            checked={checkedItems.length === cartItems.length ? true : false}
            onChange={(e) => handleAllCheck(e.target.checked)}
          ></input>
          <label>전체선택</label>
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
                  <div>No Items~</div>
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

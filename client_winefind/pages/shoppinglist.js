import Sidebar from "../components/Sidebar";
import { Card } from "semantic-ui-react";
import { useEffect, useState } from "react";
import styles from "../styles/Shoppinglist.module.css";
import classNames from "classnames";
import Article from "../components/Article";
import OrderTotal from "../components/OrderTotal";
import axios from "axios";
import Dummy from "../components/Dummy";

//마이페이지
const shoppinglist = () => {
  // dummy
  const items = [
    {
      id: 1,
      name: "Viña Ardanza Reserva 2015",
      img: "images/vina_ardanza.png",
      price: 9900,
    },
    {
      id: 2,
      name: "Château Corton Grancey Grand Cru 2015",
      img: "images/grand_cru.webp",
      price: 12000,
    },
    {
      id: 3,
      name: "Saperavi 2018",
      img: "images/vina_ardanza.png",
      price: 2900,
    },
    {
      id: 4,
      name: "Lapola 2019",
      img: "images/grand_cru.webp",
      price: 4900,
    },
    {
      id: 5,
      name: "PV Gran Cru 2019",
      img: "images/saperavi.jpeg",
      price: 2900,
    },
  ];

  let cartItems = [
    {
      itemId: 1,
      quantity: 1,
    },
    {
      itemId: 2,
      quantity: 1,
    },
    {
      itemId: 5,
      quantity: 1,
    },
  ];

  // const [articles, setArticles] = useState([]);
  const [checkedItems, setCheckedItems] = useState(
    cartItems.map((el) => el.itemId)
  ); // 와인 몰에서 와인을 추가 했을시
  //Article Get Api로 articles에 게시글 목록 넣기
  // const getArticles = () => {
  //   axios
  //     .get('https://localhost:4000/article', { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //       setArticles(res.data);
  //     })
  //     .catch((e) => {
  //       console.log('error!:', e);
  //     });
  // };

  // useEffect(() => {
  //   getArticles();
  // }, []);
  // 전채 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems.map((el) => el.itemId));
    } else {
      setCheckedItems([]);
    }
  };
  // 선택된 항목들
  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  //delete
  const handleDelete = (itemId) => {
    setCheckedItems(checkedItems.filter((el) => el !== itemId));
    console.log(checkedItems);
  };

  // 총 합을 리턴 하는 함수
  const getTotal = () => {
    let cartIdArr = cartItems.map((el) => el.itemId);
    let total = {
      price: 0,
      quantity: 0,
    };
    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.indexOf(cartIdArr[i]) > -1) {
        let quantity = cartItems[i].quantity;
        let price = items.filter((el) => el.id === cartItems[i].itemId)[0]
          .price;

        total.price = total.price + quantity * price;
        total.quantity = total.quantity + quantity;
      }
    }
    return total;
  };
  const renderItems = items.filter(
    (el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1
  );
  const total = getTotal();

  return (
    <div className={styles.mall_container}>
      <Sidebar />
      <div horizontal="true" className={styles.main_box}>
        <div className={styles.mall_content_box}>
          <div className={classNames(styles.text_big)}>장바구니</div>
          <input
            type="checkbox"
            checked={checkedItems.length === cartItems.length ? true : false}
            onChange={(e) => handleAllCheck(e.target.checked)}
          ></input>
          <label>전체선택</label>
          <div>
            {!cartItems.length ? (
              <div>{console.log("Im hereee")}장바구니에 아이템이 없습니다.</div>
            ) : (
              <div id="cart-item-list">
                {renderItems.map((item, idx) => {
                  const quantity = cartItems.filter(
                    (el) => el.itemId === item.id
                  )[0].quantity;
                  return (
                    <Dummy
                      key={idx}
                      handleCheckChange={handleCheckChange}
                      handleDelete={handleDelete}
                      item={item}
                      checkedItems={checkedItems}
                      quantity={quantity}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className={styles.filter_box}>
          <div className={styles.filter_content}>
            <div className={styles.filter_top}>
              <div className={styles.filter_title}>
                <OrderTotal total={total.price} totalQty={total.quantity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shoppinglist;

{
  /* <>
      <h1 className='logo text'>My Shopping Cart</h1>
      <div className={styles.shoppinglist_container}>
        <Sidebar />
        <div className={styles.shoppinglist_layout}>
          <div className={styles.cards}>
          
            <Card className={styles.card_height}>
              <img
                src='images/grand_cru.webp'
                className={styles.image_height}
              />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>
                    Château Corton Grancey Grand Cru 2015
                  </h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Louis Latour</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 300.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className={styles.cards}>
            <Card className={styles.card_height}>
              <img
                src='images/vina_ardanza.png'
                className={styles.image_height}
              />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Viña Ardanza Reserva 2015</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>La Rioja Alta</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 1400.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className={styles.cards}>
            <Card className={styles.card_height}>
              <img src='images/saperavi.jpeg' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Saperavi 2018</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Gitana</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 2000.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className={styles.cards}>
            <Card className={styles.card_height}>
              <img src='images/lapola.jpeg' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Lapola 2019</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Dominio do Bibei</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 1000000.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className={styles.cards}>
            <Card className={styles.card_height}>
              <img src='images/vaselo.png' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>PV Gran Cru 2019</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Petro Vaselo</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 450.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className={styles.cards}>
            <Card className={styles.card_height}>
              <img src='images/petrus.png' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Pomerol 2008</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Pétrus</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
                <div className={styles.price}>
                  <h3 className='logo text'>₩ 40.000</h3>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className={styles.shoppinglist_btn_container}>
                  <button className={styles.shoppinglist_btn}>
                    상품 보러 가기
                  </button>
                  <button className={styles.shoppinglist_btn}>구매하기</button>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </> */
}

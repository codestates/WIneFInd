import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Result.module.css';
import { Card, Icon } from 'semantic-ui-react';
import { style } from 'dom-helpers';

const Result = ({ resultWine, result }) => {
  const router = useRouter();

  const [resultData, setResultData] = useState([]);

  const getResultData = () => {
    if (result[0] === '1') {
      setResultData([...resultData, '높고']);
    } else if (result[0] !== '1') {
      setResultData([...resultData, '낮고']);
    }
    if (result[1] === '1') {
      console.log('===========??=====', result[1]);
      setResultData([...resultData, '높고']);
      console.log('===========!!=====', resultData.sweet);
    } else if (result[1] !== '1') {
      setResultData([...resultData, '낮고']);
    }
    if (result[3] === '1' || result[3] === '2' || result[3] === '3') {
      setResultData([...resultData, '좋아하지 않고']);
    } else if (result[3] === '4' || result[3] === '5') {
      setResultData([...resultData, '좋아하고']);
    }
    // if (result[4] === '1' || result[4] === '2' || result[4] === '3') {
    //   setResultData({ acidity: '좋아하지 않고' });
    // } else if (result[4] === '4' || result[4] === '5') {
    //   setResultData({ acidity: '좋아하고' });
    // }
    // if (result[5] === '1') {
    //   setResultData({ grape: '새로운 맛' });
    // } else if (result[5] === '2') {
    //   setResultData({ grape: '대중적인 맛' });
    // }
  };

  const addToCart = (func) => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('auth:', res);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              articleId: id,
              userId: res.data.userInfo.id,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log('add to cart success');
            alert('add to cart Success');
            if (func === 'goToShoppingList') {
              router.push('/shoppinglist');
            }
          })
          .catch((e) => {
            alert('already on cart');
            console.log('Already on Cart!:articleId:', id);
            if (func === 'goToShoppingList') {
              router.push('/shoppinglist');
            }
          });
      })
      .catch((e) => {
        console.log('not Logined');
        toggleModal();
      });
  };

  const purchaseItem = () => {
    addToCart('goToShoppingList');
  };

  const addOrDeleteWineList = () => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/recommended`,
            {
              articleId: article.id,
              userId: res.data.userInfo.id,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log('add to recommend success');
            alert('success to recommend');
          })
          .catch((e) => {
            console.log('already in !');
            alert('already recommended');
          });
      })
      .catch((e) => {
        console.log('not Logined');
        toggleModal();
      });
  };
  const goToTop = () => {
    window.scrollTo(0, 120);
  };

  useEffect(() => {
    getResultData();
    goToTop();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.image_and_taste}>
          <div>
            {resultWine.length !== 0 ? (
              <div
                style={{ backgroundImage: `url(${resultWine[0].wine.image})` }}
                className={styles.wine_image}
              ></div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.board_image}>
            <Card
              style={{
                width: '400px',
                margin: '-15px 0px 3px 4.5px',
                border: '1px #cda581 solid',
              }}
            >
              <Card.Content>
                <Card.Description>
                  <table className={styles.tasteStructure}>
                    <tbody>
                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Light</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '10%',
                                left:
                                  resultWine.length !== 0
                                    ? `${resultWine[0].wine.body * 22.5}%`
                                    : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Bold</div>
                        </td>
                      </tr>

                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Smooth</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '10%',
                                left:
                                  resultWine.length !== 0
                                    ? `${resultWine[0].wine.tannic * 22.5}%`
                                    : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Tannic</div>
                        </td>
                      </tr>

                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Dry</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '10%',
                                left:
                                  resultWine.length !== 0
                                    ? `${resultWine[0].wine.sweet * 22.5}%`
                                    : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Sweet</div>
                        </td>
                      </tr>

                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Soft</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '10%',
                                left:
                                  resultWine.length !== 0
                                    ? `${resultWine[0].wine.acidity * 22.5}%`
                                    : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Acidic</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div className={styles.board_content}>
          <div className={styles.title_article}>
            <div className={styles.country_box}>
              {resultWine.length !== 0 ? resultWine[0].wine.country : ''}
              &nbsp;&nbsp;| &nbsp;
              {resultWine.length !== 0
                ? resultWine[0].wine.type
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(resultWine[0].wine.type.slice(1))
                : ''}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {resultWine.length !== 0 ? resultWine[0].wine.grape : ''}
            </div>

            <div className={styles.heart}>
              <div className={styles.wineName_heart}>
                {resultWine.length !== 0 ? resultWine[0].wine.wineName : ''}
              </div>
              <div>
                <img
                  src='/images/heart.png'
                  onClick={addOrDeleteWineList}
                  className={styles.heart_image}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', width: '100%' }}>
            <div className={styles.wine_info}>
              <div className={styles.wine_price}>
                {resultWine.length !== 0 ? resultWine[0].wine.price : ''}원
                <div className={styles.vintage}>
                  {' '}
                  ({resultWine.length !== 0 ? resultWine[0].wine.vintage : ''},
                  750ml)
                </div>
              </div>
              <div className={styles.wine_description}>
                <div>
                  &nbsp;
                  {resultWine.length !== 0 ? resultWine[0].wine.content : ''}
                </div>
              </div>
              <div className={styles.article_box}>
                <div className={styles.article_description}>
                  {console.log('==================r', resultData)}
                  당신은 도수가 {resultData.length !== 0 ? resultData[0] : ''},
                  당도가 {resultData.length !== 0 ? resultData[1] : ''}, 떫은
                  맛을 {resultData.length !== 0 ? resultData[2] : ''},
                  {/* 시큼한 맛을{' '}
                  {resultData.acidity !== '' ? resultData.acidity : ''},{' '}
                  {resultData.grape !== '' ? resultData.grape : ''}을 좋아하시는
                  군요! */}
                </div>
              </div>
              <div className={styles.buttons}>
                <button
                  style={{ width: '200px', height: '60px' }}
                  className='ui button'
                  onClick={addToCart}
                >
                  장바구니에 담기&nbsp; &nbsp;&nbsp;<Icon name='shop'></Icon>
                </button>
                <br />
                <button
                  style={{ width: '200px', height: '60px' }}
                  className='ui button'
                  onClick={purchaseItem}
                >
                  구매하기&nbsp; &nbsp;&nbsp; <Icon name='won'></Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

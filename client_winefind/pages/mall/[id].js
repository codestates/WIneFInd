import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../../styles/detail.module.css';
import { Card } from 'semantic-ui-react';

const Details = ({ toggleModal }) => {
  const router = useRouter();
  const { id } = router.query;
  const API_url = `${process.env.NEXT_PUBLIC_API_URL}/article?id=${id}`;
  const [article, setArticle] = useState(null);

  //해당 게시물 정보를 id로 서버에 요청
  const getArticle = () => {
    axios
      .get(API_url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('this article data:', res.data);
        setArticle(() => res.data);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  const addToCart = (func) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              articleId: id,
              consumerId: res.data['카카오 정보'].id,
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
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth`, { withCredentials: true })
      .then((res) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/recommend`,
            {
              wineId: article.wine.id,
              consumerId: res.data['카카오 정보'].id,
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

  useEffect(() => {
    if (id && id > 0) {
      getArticle();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.wineName_writer}>
          <div className={styles.wineName}>
            {article ? article.wine.wineName : ''}
          </div>
          <button onClick={addOrDeleteWineList}>add to my wine list</button>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_image}>
            <Card className={styles.card_height}>
              {article ? (
                <div
                  style={{ backgroundImage: `url(${article.wine.image})` }}
                  className={styles.wine_image}
                ></div>
              ) : (
                ''
              )}

              <Card.Content>
                <Card.Header className={styles.card_head}>
                  {article ? article.wine.wineName : ''}
                </Card.Header>

                <Card.Description>
                  <table className={styles.tasteStructure}>
                    <tbody>
                      {/* =========light / bold================= */}
                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Light</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '15%',
                                left: article
                                  ? `${article.wine.body * 21}%`
                                  : '0%',
                              }} // 85%가 가장 높은 것! 85% 이상 안 쓰기
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Bold</div>
                        </td>
                      </tr>
                      {/* =========Smooth / Tannic================= */}
                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Smooth</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '15%',
                                left: article
                                  ? `${article.wine.tannic * 21}%`
                                  : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Tannic</div>
                        </td>
                      </tr>
                      {/* =========Dry / Sweet================= */}
                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Dry</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '15%',
                                left: article
                                  ? `${article.wine.sweet * 21}%`
                                  : '0%',
                              }}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className='tasteStructure_property'>Sweet</div>
                        </td>
                      </tr>
                      {/* =========Soft / Acidic================= */}
                      <tr className='tasteStructure_tasteCharacteristic'>
                        <td>
                          <div className='tasteStructure_property'>Soft</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: '15%',
                                left: article
                                  ? `${article.wine.acidity * 21}%`
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
              <div style={{ textAlign: 'center' }}>
                {article ? article.wine.price : ''} / 750ml
              </div>
              <br />
              <button className='ui button' onClick={addToCart}>
                장바구니에 담기
              </button>
              <br />
              <button className='ui button' onClick={purchaseItem}>
                구매하기
              </button>
            </Card>
          </div>
          <div className={styles.board_info}>
            <div className={styles.title_article}>와인 상세 정보</div>
            <div className={styles.wine_info}>
              <p>종류: {article ? article.wine.type : ''}</p>
              <p>포도: {article ? article.wine.grape : ''}</p>
              <p>국가: {article ? article.wine.country : ''}</p>
              <p>빈티지: {article ? article.wine.vintage : ''}</p>
              <p>가격: {article ? article.wine.price : ''}</p>
              <p>코멘트: {article ? article.wine.comment : ''}</p>
            </div>
            <div className={styles.wineName_writer}>
              <div className={styles.title_article}>
                {article ? article.title : ''}
              </div>
              <div className={styles.writer}>
                Written by {article ? article.user.email : ''}
              </div>
            </div>
            <p className={styles.comment_article}>
              {article ? article.comment : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/detail.module.css';
import { Card, Icon } from 'semantic-ui-react';

const Details = ({ toggleModal }) => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  let url = `${process.env.NEXT_PUBLIC_API_URL}/article?id=${id}`;
  //해당 게시물 정보를 id로 서버에 요청
  const getArticle = () => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('this article data:', res.data.articlesInfo);
        setArticle(() => res.data.articlesInfo);
      })
      .catch((e) => {
        console.log('error!:', e);
      });
  };

  const addToCart = (func) => {
    let token = localStorage.getItem('winefind');

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('auth:', res);
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
            alert('장바구니 추가되었어요');
            if (func === 'goToShoppingList') {
              router.push('/shoppinglist');
            }
          })
          .catch((e) => {
            // console.log('Already on Cart!:articleId:', id);
            alert('장바구니에 이미 있어요!');
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
            alert('내 와인셀러에 추가했어요.');
          })
          .catch((e) => {
            console.log('already in !');
            alert('이미 내 와인셀러에 있어요.');
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
    if (id && id > 0) {
      getArticle();
    }
    goToTop();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.image_and_taste}>
          <div>
            {article ? (
              <div
                style={{ backgroundImage: `url(${article.wine.image})` }}
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
                                left: article
                                  ? `${article.wine.body * 22.5}%`
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
                                left: article
                                  ? `${article.wine.tannic * 22.5}%`
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
                                left: article
                                  ? `${article.wine.sweet * 22.5}%`
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
                                left: article
                                  ? `${article.wine.acidity * 22.5}%`
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
              {article ? article.wine.country : ''}&nbsp;&nbsp;| &nbsp;
              {article
                ? article.wine.type
                    .slice(0, 1)
                    .toUpperCase()
                    .concat(article.wine.type.slice(1))
                : ''}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {article ? article.wine.grape : ''}
            </div>

            <div className={styles.heart}>
              <div className={styles.wineName_heart}>
                {article ? article.wine.wineName : ''}
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
                {article ? article.wine.price : ''}원
                <div className={styles.vintage}>
                  {' '}
                  ({article ? article.wine.vintage : ''}, 750ml)
                </div>
              </div>
              <div className={styles.wine_description}>
                <div>&nbsp;{article ? article.wine.content : ''}</div>
              </div>
              <div className={styles.article_box}>
                <div>
                  <div className={styles.article_title_box}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          article ? article.user.image : ''
                        })`,
                      }}
                      className={styles.user_image}
                    ></div>
                    <div className={styles.article_title}>
                      {article ? article.title : ''}
                    </div>
                  </div>

                  <div className={styles.article_description}>
                    {article ? article.content : ''}
                  </div>
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

export default Details;

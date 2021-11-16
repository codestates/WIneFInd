import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Result.module.css';
import { Card, Icon } from 'semantic-ui-react';

const Result = ({ resultWine, result, toggleModal, addToFavorite }) => {
  const router = useRouter();

  const moreRecommendShow = () => {
    let token = localStorage.getItem('winefind');
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('my user data:', res);
        addToFavorite();
      })
      .catch((e) => {
        console.log('not loggined', e);
        toggleModal();
      });
  };

  const goToDescription = (ele) => {
    router.push(`/mall/${ele}`);
  };
  const retest = () => {
    //배포할때 / 개발할때 html 빼기
    window.location.replace(`${process.env.NEXT_PUBLIC_CLIENT_URL}/test.html`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.result_message}>
          저희가 추천드리는 와인이에요!
        </div>
        <div className={styles.article_box}>
          <div className={styles.article_description}>
            당신은 도수가{' '}
            <span style={{ fontWeight: '1000', color: 'brown' }}>
              {result[0] === '1' ? '높고' : '낮고'}
            </span>
            , 당도가
            <span style={{ fontWeight: '1000', color: 'brown' }}>
              {result[1] === '1' ? ' 높고' : ' 낮고'}
            </span>
            , 떫은 맛을
            <span style={{ fontWeight: '1000', color: 'brown' }}>
              {result[3] === '1' || result[3] === '2' || result[3] === '3'
                ? ' 싫어하고'
                : ' 좋아하고'}
            </span>
            , 시큼한 맛을
            <span style={{ fontWeight: '1000', color: 'brown' }}>
              {result[4] === '1' || result[3] === '2' || result[3] === '3'
                ? ' 싫어하고'
                : ' 좋아하고'}
            </span>
            ,
            <span style={{ fontWeight: '1000', color: 'brown' }}>
              {result[5] === '1' ? ' 새로운 맛' : ' 대중적인 맛'}{' '}
            </span>
            을 좋아하시는 군요!
          </div>
        </div>
        {resultWine.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
            해당하는 와인을 찾지 못했어요{' '}
          </div>
        ) : (
          <div className={styles.result_box}>
            <div className={styles.image_and_taste}>
              <div>
                {resultWine.length !== 0 ? (
                  <div
                    style={{
                      backgroundImage: `url(${resultWine[0].wine.image})`,
                    }}
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
                              <div className='tasteStructure_property'>
                                Light
                              </div>
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
                              <div className='tasteStructure_property'>
                                Bold
                              </div>
                            </td>
                          </tr>

                          <tr className='tasteStructure_tasteCharacteristic'>
                            <td>
                              <div className='tasteStructure_property'>
                                Smooth
                              </div>
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
                              <div className='tasteStructure_property'>
                                Tannic
                              </div>
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
                              <div className='tasteStructure_property'>
                                Sweet
                              </div>
                            </td>
                          </tr>

                          <tr className='tasteStructure_tasteCharacteristic'>
                            <td>
                              <div className='tasteStructure_property'>
                                Soft
                              </div>
                            </td>
                            <td className={styles.tasteStructure_progressBar}>
                              <div className={styles.indicatorBar_meter}>
                                <span
                                  className={styles.indicatorBar_progress}
                                  style={{
                                    width: '10%',
                                    left:
                                      resultWine.length !== 0
                                        ? `${
                                            resultWine[0].wine.acidity * 22.5
                                          }%`
                                        : '0%',
                                  }}
                                ></span>
                              </div>
                            </td>
                            <td>
                              <div className='tasteStructure_property'>
                                Acidic
                              </div>
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
                </div>
              </div>

              <div style={{ display: 'flex', width: '100%' }}>
                <div className={styles.wine_info}>
                  <div className={styles.wine_price}>
                    {resultWine.length !== 0 ? resultWine[0].wine.price : ''}원
                    <div className={styles.vintage}>
                      {' '}
                      (
                      {resultWine.length !== 0
                        ? resultWine[0].wine.vintage
                        : ''}
                      , 750ml)
                    </div>
                  </div>
                  <div className={styles.wine_description}>
                    <div>
                      &nbsp;
                      {resultWine.length !== 0
                        ? resultWine[0].wine.content
                        : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div className={styles.buttons}>
                      <button
                        style={{ width: '200px', height: '60px' }}
                        className='ui button'
                        onClick={moreRecommendShow}
                      >
                        내 셀러에 담기&nbsp; &nbsp;&nbsp;
                      </button>
                      <br />
                      <button
                        style={{ width: '200px', height: '60px' }}
                        className='ui button'
                        onClick={() =>
                          goToDescription(
                            resultWine.length !== 0 ? resultWine[0].wine.id : ''
                          )
                        }
                      >
                        와인 몰에서 보기&nbsp; &nbsp;&nbsp;{' '}
                      </button>
                      <br />
                      <button
                        style={{ width: '200px', height: '60px' }}
                        className='ui button'
                        onClick={retest}
                      >
                        테스트 다시하기&nbsp; &nbsp;&nbsp;{' '}
                      </button>
                    </div>
                  </div>
                  {/* <div className={styles.buttons}>
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
                </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;

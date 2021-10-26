import Sidebar from '../components/Sidebar';
import { Card } from 'semantic-ui-react';
import styles from '../styles/User.module.css';

//마이페이지
const shoppinglist = () => {
  let taste = (
    <table className={styles.tasteStructure}>
      <tbody>
        {/* 여기서부턴 Light && Bold */}
        <tr class='tasteStructure_tasteCharacteristic'>
          <td>
            <div class='tasteStructure_property'>Light</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{ width: '15%', left: '60%' }} // left는 85% 가 max이다 85 안넘기 조심하기
              ></span>
            </div>
          </td>
          <td>
            <div class='tasteStructure_property'>Bold</div>
          </td>
        </tr>
        {/* 여기서부턴 smooth && tannic */}
        <tr class='tasteStructure_tasteCharacteristic'>
          <td>
            <div class='tasteStructure_property'>Smooth</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{ width: '15%', left: '55%' }}
              ></span>
            </div>
          </td>
          <td>
            <div class='tasteStructure_property'>Tannic</div>
          </td>
        </tr>
        {/* 여기서부턴 dry && sweet */}
        <tr class='tasteStructure_tasteCharacteristic'>
          <td>
            <div class='tasteStructure_property'>Dry</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{ width: '15%', left: '9.45708%' }}
              ></span>
            </div>
          </td>
          <td>
            <div class='tasteStructure_property'>Sweet</div>
          </td>
        </tr>
        {/* 여기서부턴 soft && acidic */}
        <tr class='tasteStructure_tasteCharacteristic'>
          <td>
            <div class='tasteStructure_property'>Soft</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{ width: '15%', left: '64.4675%' }}
              ></span>
            </div>
          </td>
          <td>
            <div class='tasteStructure_property'>Acidic</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
  return (
    <>
      <h1 className='logo text'>My Shopping Cart</h1>
      <div className={styles.shoppinglist_container}>
        <Sidebar />
        <div className={styles.shoppinglist_layout}>
          <div className={styles.cards}>
            {/* 111111111111 */}
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
          {/* 2222222222222 */}
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
          {/* 3333333333333333 */}
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
          {/* 444444444444444 */}
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
          {/* 55555555555555 */}
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
          {/* 6666666666666666 */}
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
    </>
  );
};

export default shoppinglist;

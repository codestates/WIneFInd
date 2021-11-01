import { Card, Icon } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

let taste = (
  <table className={styles.tasteStructure}>
    <tbody>
      {/* 여기서부턴 Light && Bold */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Light</div>
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
          <div className='tasteStructure_property'>Bold</div>
        </td>
      </tr>
      {/* 여기서부턴 smooth && tannic */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Smooth</div>
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
          <div className='tasteStructure_property'>Tannic</div>
        </td>
      </tr>
      {/* 여기서부턴 dry && sweet */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Dry</div>
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
          <div className='tasteStructure_property'>Sweet</div>
        </td>
      </tr>
      {/* 여기서부턴 soft && acidic */}
      <tr className='tasteStructure_tasteCharacteristic'>
        <td>
          <div className='tasteStructure_property'>Soft</div>
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
          <div className='tasteStructure_property'>Acidic</div>
        </td>
      </tr>
    </tbody>
  </table>
);

const CardCompo = (wines) => {
  return (
    <div className={styles.card_height}>
      <img src={wines.img} className={styles.image_height} />
      <div>
        <div className={styles.card_head}>
          <h3 className='logo text'>{wines.name}</h3>
        </div>
        <div>
          <span className='date'>{wines.region}</span>
        </div>
        <div>{taste}</div>
      </div>
      <div>
        <button className={styles.user_btn}>상품 보러 가기</button>
        <h3 className={styles.price}>{wines.price}</h3>
      </div>
    </div>
  );
};

export default CardCompo;

{
  /* <div className={styles.slide}>             
             <Card className={styles.card_height}>
               <img 
//                 src='images/grand_cru.webp'
//                 className={styles.image_height}
//               />
//               <Card.Content>
//                 <Card.Header className={styles.card_head}>
//                   <h3 className='logo text'>
//                     Château Corton Grancey Grand Cru 2015
//                   </h3>
//                 </Card.Header>
//                 <Card.Meta>
//                   <span className='date'>Louis Latour</span>
//                 </Card.Meta>
//                 <Card.Description>{taste}</Card.Description>
//               </Card.Content>
//               <Card.Content extra>
//                 <button className={styles.user_btn}>상품 보러 가기</button>
//               </Card.Content>
//             </Card>
//             
//             <Card className={styles.card_height}>
//               <img src='images/petrus.png' className={styles.image_height} />
//               <Card.Content>
//                 <Card.Header className={styles.card_head}>
//                   <h3 className='logo text'>Petrus 1880</h3>
//                 </Card.Header>
//                 <Card.Meta>
//                   <span className='date'>Roberta Petruis</span>
//                 </Card.Meta>
//                 <Card.Description>{taste}</Card.Description>
//               </Card.Content>
//               <Card.Content extra>
//                 <button className={styles.user_btn}>상품 보러 가기</button>
//               </Card.Content>
//             </Card>
//         
//             <Card className={styles.card_height}>
//               <img src='images/saperavi.jpeg' className={styles.image_height} />
//               <Card.Content>
//                 <Card.Header className={styles.card_head}>
//                   <h3 className='logo text'>Saperavi 2001</h3>
//                 </Card.Header>
//                 <Card.Meta>
//                   <span className='date'>Richotta Don Saperavi</span>
//                 </Card.Meta>
//                 <Card.Description>{taste}</Card.Description>
//               </Card.Content>
//               <Card.Content extra>
//                 <button className={styles.user_btn}>상품 보러 가기</button>
//               </Card.Content>
//             </Card>
//           </div>

*/
}

{
  /* 2번째 슬라이드!!!!!!! */
}
{
  /* 
          <div className={styles.slide}>
        
            <Card className={styles.card_height}>
              <img src='images/lapola.jpeg' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Lapola 1934</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Avec Lapolee</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card>
            
            <Card className={styles.card_height}>
              <img
                src='images/vina_ardanza.png'
                className={styles.image_height}
              />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Vina 1954</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Vinita Ardanza</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card>
            
            <Card className={styles.card_height}>
              <img src='images/mainpage.jpg' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Michelle 1340</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Michellini</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card>
          </div>
        </div> 
         */
}

{
  /* 1번째 카드!!!!!!!! */
}
{
  /* <Card className={styles.card_height}>
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
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card> */
}
{
  /*             
            <Card className={styles.card_height}>
              <img src='images/petrus.png' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Petrus 1880</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Roberta Petruis</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card>

            <Card className={styles.card_height}>
              <img src='images/saperavi.jpeg' className={styles.image_height} />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  <h3 className='logo text'>Saperavi 2001</h3>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>Richotta Don Saperavi</span>
                </Card.Meta>
                <Card.Description>{taste}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <button className={styles.user_btn}>상품 보러 가기</button>
              </Card.Content>
            </Card> */
}

import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import { Card, Icon } from 'semantic-ui-react';

//마이페이지
const user = () => {
  return (
    <>
      <div>
        <Sidebar />
        <div className={styles.container}>
          <h1>My Wine List</h1>
          <div className={styles.cards_container}>
            <div className={styles.layout}>
              <div className={styles.cards}>
                <Card className={styles.card_height}>
                  <img
                    src='images/grand_cru.webp'
                    className={styles.image_height}
                  />
                  <Card.Content>
                    <Card.Header className={styles.card_head}>
                      Château Corton Grancey Grand Cru 2015
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>Louis Latour</span>
                    </Card.Meta>
                    <Card.Description>
                      <table className={styles.tasteStructure}>
                        <tbody>
                          <tr class='tasteStructure_tasteCharacteristic'>
                            <td>
                              <div class='tasteStructure_property'>Light</div>
                            </td>
                            <td className={styles.tasteStructure_progressBar}>
                              <div className={styles.indicatorBar_meter}>
                                <span
                                  className={styles.indicatorBar_progress}
                                  style={{ width: '15%', left: '34.5278%' }}
                                ></span>
                              </div>
                            </td>
                            <td>
                              <div class='tasteStructure_property'>Bold</div>
                            </td>
                          </tr>

                          <tr class='tasteStructure_tasteCharacteristic'>
                            <td>
                              <div class='tasteStructure_property'>Smooth</div>
                            </td>
                            <td className={styles.tasteStructure_progressBar}>
                              <div className={styles.indicatorBar_meter}>
                                <span
                                  className={styles.indicatorBar_progress}
                                  style={{ width: '15%', left: '24.5211%' }}
                                ></span>
                              </div>
                            </td>
                            <td>
                              <div class='tasteStructure_property'>Tannic</div>
                            </td>
                          </tr>

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
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='star' />
                      22 recommendations
                    </a>
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
                      Viña Ardanza Reserva 2015
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>La Rioja Alta</span>
                    </Card.Meta>
                    <Card.Description>
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
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name='star' />
                      190 recommendations
                    </a>
                  </Card.Content>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default user;

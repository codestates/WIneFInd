import Sidebar from "../components/Sidebar";
import styles from "../styles/detail.module.css";
import { Card, Icon, Button } from "semantic-ui-react";
import UploadModal from "../components/UploadModal";
//마이페이지
const winedetail = () => {
  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.board_container}>
            <div className={styles.board_layout}>
              {/* =================111================== */}
              <div
                className={styles.board_card}
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  maxHeight: "470px",
                }}
              >
                <div
                  className="row g-0"
                  style={{ backgroundColor: "lightyellow" }}
                >
                  <div class="col-md-4" style={{ backgroundColor: "white" }}>
                    <div className={styles.cards}>
                      <Card className={styles.card_height}>
                        <img
                          src="images/grand_cru.webp"
                          className={styles.image_height}
                        />
                        <Card.Content>
                          <Card.Header className={styles.card_head}>
                            Château Corton Grancey Grand Cru 2015
                          </Card.Header>
                          <Card.Meta>
                            <span className="date">Louis Latour</span>
                          </Card.Meta>
                          <Card.Description>
                            <table className={styles.tasteStructure}>
                              <tbody>
                                {/* =========light / bold================= */}
                                <tr class="tasteStructure_tasteCharacteristic">
                                  <td>
                                    <div class="tasteStructure_property">
                                      Light
                                    </div>
                                  </td>
                                  <td
                                    className={
                                      styles.tasteStructure_progressBar
                                    }
                                  >
                                    <div className={styles.indicatorBar_meter}>
                                      <span
                                        className={styles.indicatorBar_progress}
                                        style={{
                                          width: "15%",
                                          left: "34.5278%",
                                        }} // 85%가 가장 높은 것! 85% 이상 안 쓰기
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="tasteStructure_property">
                                      Bold
                                    </div>
                                  </td>
                                </tr>
                                {/* =========Smooth / Tannic================= */}
                                <tr class="tasteStructure_tasteCharacteristic">
                                  <td>
                                    <div class="tasteStructure_property">
                                      Smooth
                                    </div>
                                  </td>
                                  <td
                                    className={
                                      styles.tasteStructure_progressBar
                                    }
                                  >
                                    <div className={styles.indicatorBar_meter}>
                                      <span
                                        className={styles.indicatorBar_progress}
                                        style={{
                                          width: "15%",
                                          left: "24.5211%",
                                        }}
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="tasteStructure_property">
                                      Tannic
                                    </div>
                                  </td>
                                </tr>
                                {/* =========Dry / Sweet================= */}
                                <tr class="tasteStructure_tasteCharacteristic">
                                  <td>
                                    <div class="tasteStructure_property">
                                      Dry
                                    </div>
                                  </td>
                                  <td
                                    className={
                                      styles.tasteStructure_progressBar
                                    }
                                  >
                                    <div className={styles.indicatorBar_meter}>
                                      <span
                                        className={styles.indicatorBar_progress}
                                        style={{
                                          width: "15%",
                                          left: "9.45708%",
                                        }}
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="tasteStructure_property">
                                      Sweet
                                    </div>
                                  </td>
                                </tr>
                                {/* =========Soft / Acidic================= */}
                                <tr class="tasteStructure_tasteCharacteristic">
                                  <td>
                                    <div class="tasteStructure_property">
                                      Soft
                                    </div>
                                  </td>
                                  <td
                                    className={
                                      styles.tasteStructure_progressBar
                                    }
                                  >
                                    <div className={styles.indicatorBar_meter}>
                                      <span
                                        className={styles.indicatorBar_progress}
                                        style={{
                                          width: "15%",
                                          left: "64.4675%",
                                        }}
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="tasteStructure_property">
                                      Acidic
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <a>
                            <Icon name="star" />
                            22 recommendations
                          </a>
                        </Card.Content>
                      </Card>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className={styles.card_title}>
                        Château Corton Grancey Grand Cru 2015
                      </h2>
                      <p className={styles.writer}>
                        <medium
                          className="text-muted"
                          style={{ textAlign: "right" }}
                        >
                          Written by. sehan95
                        </medium>
                      </p>
                      <p className={styles.card_text}>
                        달달하면서도 좀 드라이 한 맛이 강해 저한테 딱
                        맞더라구요!
                        saldfalsdfljaslk;fjl;saldfalsdfljaslkasdflalsdjfllas;dflk;jsak;lfj;slkajflskaf
                        aslkfl;asjdf;Descriptionasdflksald;fl;asjdfl;ksjkl;fjsklflksajdlkf;sl;fjlksad;jflk;dsjkflsdjklfjskaldfjlsk;ajfklsjdfklsjfklsaj;lfa
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </p>
                      <div className={styles.buy}>
                        <Button color="violet">
                          <Icon name="money" />
                          &nbsp;구매하기
                        </Button>
                        <Button color="purple">
                          <Icon name="shopping cart" />
                          &nbsp;장바구니에 추가
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default winedetail;

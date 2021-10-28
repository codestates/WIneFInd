import Sidebar from "../components/Sidebar";
import styles from "../styles/detail.module.css";
import { Card, Icon, Button } from "semantic-ui-react";
import UploadModal from "./UploadModal";
//마이페이지
const winedetail = () => {
  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.board_layout}>
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
                  <div className={styles.cards}></div>
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
                      달달하면서도 좀 드라이 한 맛이 강해 저한테 딱 맞더라구요!
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
    </>
  );
};

export default winedetail;
{
  /* <Card.Content extra>
                        <a>
                          <Icon name="star" />
                          22 recommendations
                        </a>
                      </Card.Content> */
}

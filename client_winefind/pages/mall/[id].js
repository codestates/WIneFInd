import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../../styles/detail.module.css";
import { Card, Icon, Button } from "semantic-ui-react";

const details = () => {
  const router = useRouter();
  const { id } = router.query;
  const API_url = `https://localhost:4000/article?id=${id}`;

  //해당 게시물 정보를 id로 서버에 요청
  const getArticle = () => {
    axios
      .get(API_url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setArticle(res.data);
      })
      .catch((e) => {
        console.log("error!:", e);
      });
  };

  useEffect(() => {
    if (id && id > 0) {
      getArticle();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      {console.log("id:", id)}
      <div className={styles.board_layout}>
        <div className={styles.wineName_writer}>
          <div>Wine Name</div>
          <div>and Writer</div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_image}>
            <Card className={styles.card_height}>
              <img src="/images/grand_cru.webp" />
              <Card.Content>
                <Card.Header className={styles.card_head}>
                  Château Corton Grancey Grand Cru 2015
                </Card.Header>

                <Card.Description>
                  <table className={styles.tasteStructure}>
                    <tbody>
                      {/* =========light / bold================= */}
                      <tr className="tasteStructure_tasteCharacteristic">
                        <td>
                          <div className="tasteStructure_property">Light</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
                          <div className={styles.indicatorBar_meter}>
                            <span
                              className={styles.indicatorBar_progress}
                              style={{
                                width: "15%",
                                left: "0%",
                              }} // 85%가 가장 높은 것! 85% 이상 안 쓰기
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div className="tasteStructure_property">Bold</div>
                        </td>
                      </tr>
                      {/* =========Smooth / Tannic================= */}
                      <tr className="tasteStructure_tasteCharacteristic">
                        <td>
                          <div className="tasteStructure_property">Smooth</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
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
                          <div className="tasteStructure_property">Tannic</div>
                        </td>
                      </tr>
                      {/* =========Dry / Sweet================= */}
                      <tr className="tasteStructure_tasteCharacteristic">
                        <td>
                          <div className="tasteStructure_property">Dry</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
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
                          <div className="tasteStructure_property">Sweet</div>
                        </td>
                      </tr>
                      {/* =========Soft / Acidic================= */}
                      <tr className="tasteStructure_tasteCharacteristic">
                        <td>
                          <div className="tasteStructure_property">Soft</div>
                        </td>
                        <td className={styles.tasteStructure_progressBar}>
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
                          <div className="tasteStructure_property">Acidic</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
          <div className={styles.board_info}>
            Wine Name and Writer SPace between
          </div>
        </div>
      </div>
    </div>
  );
};

export default details;

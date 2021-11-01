import styles from "../styles/upload.module.css";
import { Card, Dropdown, Input, Button } from "semantic-ui-react";
import React, { useState, useEffect } from "react";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadArticle = () => {
    console.log("axios post to server");
  };
  const typeOptions = [
    {
      key: "type",
      text: "red",
      value: "red",
    },
    {
      key: "type",
      text: "white",
      value: "white",
    },
    {
      key: "type",
      text: "sparkling",
      value: "sparkling",
    },
    {
      key: "type",
      text: "rose",
      value: "rose",
    },
  ];
  const countryOptions = [
    { key: "au", value: "au", flag: "au", text: "Australia" },
    { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
    { key: "cl", value: "cl", flag: "cl", text: "Chile" },
    { key: "fr", value: "fr", flag: "fr", text: "France" },
    { key: "de", value: "de", flag: "de", text: "Germany" },
    { key: "nz", value: "nz", flag: "nz", text: "New Zealand" },
    { key: "us", value: "us", flag: "us", text: "USA" },
    { key: "it", value: "it", flag: "it", text: "Italy" },
    { key: "es", value: "es", flag: "es", text: "Spain" },
    { key: "za", value: "za", flag: "za", text: "Repulic of South Africa" },
  ];
  let taste = (
    <table className={styles.tasteStructure}>
      <tbody>
        {/* 여기서부턴 Light && Bold */}
        <tr className="tasteStructure_tasteCharacteristic">
          <td>
            <div className="tasteStructure_property">Light</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min="0"
                max="4"
                step="1"
                type="range"
                className={styles.taste_bar}
              />
            </div>
          </td>
          <td>
            <div className="tasteStructure_property">Bold</div>
          </td>
        </tr>

        <tr className="tasteStructure_tasteCharacteristic">
          <td>
            <div className="tasteStructure_property">Smooth</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min="0"
                max="4"
                step="1"
                type="range"
                className={styles.taste_bar}
              />
            </div>
          </td>
          <td>
            <div className="tasteStructure_property">Tannic</div>
          </td>
        </tr>

        <tr className="tasteStructure_tasteCharacteristic">
          <td>
            <div className="tasteStructure_property">Dry</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min="0"
                max="4"
                step="1"
                type="range"
                className={styles.taste_bar}
              />
            </div>
          </td>
          <td>
            <div className="tasteStructure_property">Sweet</div>
          </td>
        </tr>

        <tr className="tasteStructure_tasteCharacteristic">
          <td>
            <div className="tasteStructure_property">Soft</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min="0"
                max="4"
                step="1"
                type="range"
                className={styles.taste_bar}
              />
            </div>
          </td>
          <td>
            <div className="tasteStructure_property">Acidic</div>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.wineName_writer}>
          <div className={styles.wineName}>게시글 업로드</div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_info}>
            <div className={styles.title_article}>와인 상세 정보</div>
            <div className={styles.wine_info}>
              <div className={styles.wine_info_2}>
                <p>Wine name</p>
                <Input type="text" placeholder="Type wine name" />
                <br />
                <p>Type</p>
                <Dropdown
                  placeholder="Select Type"
                  fluid
                  selection
                  options={typeOptions}
                />
                <br />
                <p>Country</p>
                <Dropdown
                  placeholder="Select Country"
                  fluid
                  selection
                  options={countryOptions}
                />
                <br />
                <p>Grape</p>
                <Input placeholder="Type Grape" />
                <br />
                <p>Vintage</p>
                <Input
                  type="number"
                  defaultValue="2020"
                  placeholder="Type vintage"
                />
                <br />
                <p>Price(\)</p>
                <Input
                  type="number"
                  defaultValue="0"
                  placeholder="Type price"
                />
                <br />
                <p>Comment</p>
                <textarea
                  className={styles.textarea_wine}
                  placeholder="Comment about your wine"
                ></textarea>
              </div>
              {/* /// */}
              <div className={styles.board_image}>
                <Card className={styles.card_height}>
                  <img src={createObjectURL} className={styles.keepimg} />
                  <div>
                    Upload Wine Image!
                    <input type="file" onChange={uploadToClient} />
                  </div>
                  <Card.Content>
                    <Card.Header className={styles.card_head}>
                      Describe taste of the Wine!
                    </Card.Header>

                    <Card.Description>{taste}</Card.Description>
                  </Card.Content>
                </Card>
              </div>
            </div>

            <div className={styles.title_article}>게시글 정보</div>
            <p className={styles.comment_article}>
              <Input
                type="text"
                style={{ width: "300px" }}
                placeholder="Title here!"
              />
              <textarea
                className={styles.textarea}
                placeholder="Comment about your wine"
              ></textarea>
            </p>

            <Button
              style={{
                width: "350px",
                height: "80px",
                alignSelf: "center",
                margin: "20px",
              }}
              animated
              onClick={uploadArticle}
            >
              <Button.Content visible>게시글 작성</Button.Content>
              <Button.Content hidden>Upload</Button.Content>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

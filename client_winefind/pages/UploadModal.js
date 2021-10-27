import { Button, Header, Image, Modal } from 'semantic-ui-react';
import styles from '../styles/Upload.module.css';
import React, { useState, useEffect } from 'react';

function UploadModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  let tasteValue = <input type='range' value='' className={styles.taste_bar} />;

  let taste = (
    <table className={styles.tasteStructure}>
      <tbody>
        {/* 여기서부턴 Light && Bold */}
        <tr class='tasteStructure_tasteCharacteristic'>
          <td>
            <div class='tasteStructure_property'>Light</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              {/* 여기에 input type 들어감 */}
              <input type='range' className={styles.taste_bar} />
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
            <div className={styles.tastebar_container}>
              {/* 여기에 input type 들어감 */}
              <input type='range' className={styles.taste_bar} />
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
            <div className={styles.tastebar_container}>
              {/* 여기에 input type 들어감 */}
              <input type='range' className={styles.taste_bar} />
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
            <div className={styles.tastebar_container}>
              {/* 여기에 input type 들어감 */}
              <input type='range' className={styles.taste_bar} />
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
    <div className={styles.upload_container}>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Upload Wine</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <div className={styles.contain}>
          <Modal.Content image>
            {/* <Image size='medium' src='images/vina_ardanza.png' wrapped /> */}
            <img src={createObjectURL} className={styles.keepimg} />
            <div>
              <input type='file' onChange={uploadToClient} />
            </div>
            <div>{taste}</div>
            <div className={styles.upload}>
              <Modal.Description>
                <Header>
                  <input
                    className={styles.wine_name}
                    placeholder='Wine Title Here'
                  ></input>
                </Header>
                <textarea
                  className={styles.upload_text}
                  type='textbox'
                  placeholder='Wine Description Here!'
                />
              </Modal.Description>
            </div>
          </Modal.Content>
        </div>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content='Upload'
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default UploadModal;

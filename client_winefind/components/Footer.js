import styles from '../styles/Home.module.css';
import { List } from 'semantic-ui-react';

const Footer = () => {
  return (
    <>
      <div style={{ margin: '0px 15rem' }}>
        <List floated='right' vertical='true'>
          <List.Item>Contact Us.</List.Item>
          <List.Item href='#'>김형준 github</List.Item>
          <List.Item href='#'>박민준 github</List.Item>
          <List.Item href='#'>한승우 github</List.Item>
        </List>

        <List floated='left' horizontal='true'>
          <List.Item href='#'>문의사항 작성 </List.Item>
          <List.Item href='#'> | Wiki</List.Item>
        </List>

        <List horizontal style={{ display: 'flex', justifyContent: 'center' }}>
          <List.Item disabled href='#'>
            Copyright © 2021. Apoint. All rights reserved.
          </List.Item>
        </List>
      </div>
      <div style={{ marginTop: '5rem' }}>
        <br></br>
      </div>
    </>
  );
};

export default Footer;

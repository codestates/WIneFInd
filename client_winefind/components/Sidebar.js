import { useRouter } from 'next/dist/client/router';
import { Icon, Menu, Sticky } from 'semantic-ui-react';
import styles from '../styles/User.module.css';
import Link from 'next/link';

export default function Sidebar({ handleIconClick, Myprofile }) {
  return (
    <Sticky className={styles.side}>
      <Menu icon='labeled' vertical='true' className={styles.sidebar}>
        <Link href='/user'>
          <Menu.Item>
            <Icon name='list layout' />내 셀러
          </Menu.Item>
        </Link>
        <Link href='/shoppinglist'>
          <Menu.Item>
            <Icon name='shopping cart' /> 장바구니
          </Menu.Item>
        </Link>
        <Link href='/myprofile'>
          <Menu.Item>
            <Icon name='user' />내 정보
          </Menu.Item>
        </Link>
        <Link href='/resign'>
          <Menu.Item>
            <Icon name='user cancel' />
            회원 탈퇴
          </Menu.Item>
        </Link>
      </Menu>
    </Sticky>
  );
}

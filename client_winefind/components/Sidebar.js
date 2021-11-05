import { useRouter } from 'next/dist/client/router';
import { Icon, Menu, Sticky } from 'semantic-ui-react';
import styles from '../styles/User.module.css';
import Link from 'next/link';

export default function Sidebar({ handleIconClick, Myprofile }) {
  return (
    <Menu className={styles.side} icon='labeled' vertical='true'>
      {/* 내 와인 추천 페이지로 가기 */}
      <Link href='/user'>
        <Menu.Item>
          <Icon name='list layout' />내 셀러
        </Menu.Item>
      </Link>
      {/* 장바구니 페이지로 가기 */}
      <Link href='/shoppinglist'>
        <Menu.Item>
          <Icon name='shopping cart' /> 장바구니
        </Menu.Item>
      </Link>
      {/* 내 정보 수정하러 가기 */}
      <Link href='/myprofile'>
        <Menu.Item>
          <Icon name='user' />내 정보
        </Menu.Item>
      </Link>
      {/* 회원 탈퇴하러 가기 */}
      <Link href='/resign'>
        <Menu.Item>
          <Icon name='user cancel' />
          회원 탈퇴
        </Menu.Item>
      </Link>
    </Menu>
  );
}

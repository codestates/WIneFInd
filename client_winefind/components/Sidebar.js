import { useRouter } from 'next/dist/client/router';
import { Icon, Menu, Sticky } from 'semantic-ui-react';
import styles from '../styles/User.module.css';

export default function Sidebar({ handleIconClick, Myprofile }) {
  const router = useRouter();
  let activeItem;

  if (router.pathname === '/user') {
    activeItem = 'user';
  } else if (router.pathname === '/shoppinglist') {
    activeItem = 'shoppinglist';
  } else if (router.pathname === '/myprofile') {
    activeItem = 'myprofile';
  } else if (router.pathname === '/resign') {
    activeItem = 'resign';
  }

  function goLink(e, data) {
    if (data.name === 'user') {
      router.push('/user');
    } else if (data.name === 'shoppinglist') {
      router.push('/shoppinglist');
    } else if (data.name === 'myprofile') {
      router.push('/myprofile');
    } else if (data.name === 'resign') {
      router.push('/resign');
    }
  }

  return (
    <Sticky className={styles.side}>
      <Menu icon='labeled' vertical='true' className={styles.sidebar}>
        <Menu.Item name='user' active={activeItem === 'user'} onClick={goLink}>
          <Icon name='list layout' />내 셀러
        </Menu.Item>
        <Menu.Item
          name='shoppinglist'
          active={activeItem === 'shoppinglist'}
          onClick={goLink}
        >
          <Icon name='shopping cart' /> 장바구니
        </Menu.Item>

        <Menu.Item
          name='myprofile'
          activeItem={activeItem === 'myprofile'}
          onClick={goLink}
        >
          <Icon name='user' />내 정보
        </Menu.Item>

        <Menu.Item
          name='resign'
          active={activeItem === 'resign'}
          onClick={goLink}
        >
          <Icon name='user cancel' />
          회원 탈퇴
        </Menu.Item>
      </Menu>
    </Sticky>
  );
}


import styles from '../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';
import { Menu, Segment, Icon } from 'semantic-ui-react';


function Top() {
  const router = useRouter();
  let activeItem;

  if (router.pathname === '/user') {
    activeItem = 'user';
  } else if (router.pathname === '/learning') {
    activeItem = 'learning';
  } else if (router.pathname === '/test') {
    activeItem = 'test';
  } else if (router.pathname === '/index') {
    activeItem = 'logout';
  }

  function goLink(e, data) {
    if (data.name === 'user') {
      router.push('/user');
    } else if (data.name === 'learning') {
      router.push('/learning');
    } else if (data.name === 'test') {
      router.push('/test');
    } else if (data.name === 'logout') {
      router.push('/index');
    }
  }

  return (

    <Segment inverted style={{ backgroundColor: 'purple' }}>
      <Menu
        inverted
        pointing
        secondary
        style={{ marginLeft: '70rem', borderColor: 'purple' }}
      >
        <div className={styles.top_container}>
      <img className={styles.logo} src="/images/logo.png" />
      &nbsp;&nbsp;<h1>WIne FInd</h1>
    </div>
        <Menu.Item
          name='learning'
          active={activeItem === 'learning'}
          onClick={goLink}
        >
          와인 배우기
        </Menu.Item>
        <Menu.Item name='test' active={activeItem === 'test'} onClick={goLink}>
          와인 취향 테스트
        </Menu.Item>
        <Menu.Item name='user' active={activeItem === 'user'} onClick={goLink}>
          나만의 와인 셀러
        </Menu.Item>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={goLink}
        >
          <Icon name='log out' />
          Logout
        </Menu.Item>
      </Menu>
    </Segment>
  );
}

export default Top;

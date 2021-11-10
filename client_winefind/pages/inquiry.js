import styles from '../styles/User.module.css';
import Sidebar from '../components/Sidebar';

const Inquiry = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.resign_container}>
        <div
          style={{
            width: '1000px',
            textAlign: 'center',
            padding: '20px',
            color: 'black',
            backgroundColor: 'white',
            fontSize: '2rem',
            borderRadius: '2px',
          }}
        >
          <div
            className='text_font'
            style={{ marginTop: '70px', padding: '10px' }}
          >
            서비스 준비 중입니다.
          </div>
          <img src='images/loading.gif' style={{ width: '550px' }} />
        </div>
      </div>
    </>
  );
};

export default Inquiry;

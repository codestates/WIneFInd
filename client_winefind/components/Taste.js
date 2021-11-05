import styles from '../styles/User.module.css';

const Taste = ({ wine }) => {
  return (
    <table className={styles.tasteStructure}>
      <tbody>
        {/* 여기서부턴 Light && Bold */}
        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Light</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{
                  width: '15%',
                  left: wine ? `${wine.wine.body * 21.7}%` : '0%',
                }} // left는 85% 가 max이다 85 안넘기 조심하기
              ></span>
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Bold</div>
          </td>
        </tr>
        {/* 여기서부턴 smooth && tannic */}
        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Smooth</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{
                  width: '15%',
                  left: wine ? `${wine.wine.tannic * 21.7}%` : '0%',
                }}
              ></span>
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Tannic</div>
          </td>
        </tr>
        {/* 여기서부턴 dry && sweet */}
        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Dry</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{
                  width: '15%',
                  left: wine ? `${wine.wine.sweet * 21.7}%` : '0%',
                }}
              ></span>
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Sweet</div>
          </td>
        </tr>
        {/* 여기서부턴 soft && acidic */}
        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Soft</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.indicatorBar_meter}>
              <span
                className={styles.indicatorBar_progress}
                style={{
                  width: '15%',
                  left: wine ? `${wine.wine.acidity * 21.7}%` : '0%',
                }}
              ></span>
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Acidic</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Taste;

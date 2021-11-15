import styles from '../styles/Mall.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Button, Label, Icon, Flag } from 'semantic-ui-react';

const FilterList = ({ ele, key, eraseThis }) => {
  return (
    <div onClick={eraseThis} style={{ width: '100px', zIndex: 1000 }}>
      <button key={key} className={styles.totalfilter_button}>
        {/* 와인 타입별 라벨 색깔 정의 */}
        {ele === 'red' ? (
          <Label className={styles.label_width} color='red'>
            Red
            <Icon value={ele} name='close' className={styles.filter_icon} />
          </Label>
        ) : ele === 'white' ? (
          <Label className={styles.label_width} color='blue'>
            White
            <Icon value={ele} name='close' className={styles.filter_icon} />
          </Label>
        ) : ele === 'sparkling' ? (
          <Label className={styles.label_width} color='yellow'>
            Sparkling
            <Icon value={ele} name='close' className={styles.filter_icon} />
          </Label>
        ) : ele === 'rose' ? (
          <Label
            className={styles.label_width}
            style={{ backgroundColor: 'rgb(248, 184, 195)' }}
          >
            Rose
            <Icon value={ele} name='close' className={styles.filter_icon} />
          </Label>
        ) : // 국가별 국기 설정
        ele === 'France' ||
          ele === 'Italy' ||
          ele === 'Australia' ||
          ele === 'Germany' ||
          ele === 'Argentina' ||
          ele === 'Hungary' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name={ele.toLowerCase()} />
            {ele.toUpperCase().slice(0, 3)}&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : ele === 'Spain' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name={ele.toLowerCase()} />
            ESP&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : ele === 'New Zealand' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name={ele.toLowerCase()} />
            NZL&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : ele === 'USA' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name='america' />
            USA&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : ele === 'Chile' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name={ele.toLowerCase()} />
            CHL&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : ele === 'Republic of South Africa' ? (
          <div className={styles.country_border}>
            <Flag style={{ marginTop: '2px' }} name={ele.toLowerCase()} />
            ZAF&nbsp;
            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : // 맛 별 필터 설정
        ele.slice(0, 7) === 'acidity' ||
          ele.slice(0, 9) === 'sweetness' ||
          ele.slice(0, 4) === 'body' ||
          ele.slice(0, 6) === 'tannic' ? (
          <div className={styles.country_border}>
            {ele
              .slice(0, 1)
              .toUpperCase()
              .concat(ele.slice(1, ele.length - 1))
              .concat(' ')
              .concat(ele.slice(ele.length - 1))}

            <Icon
              size='small'
              value={ele}
              name='close'
              className={styles.filter_icon_red}
            />
          </div>
        ) : (
          <div></div>
        )}
      </button>
    </div>
  );
};

export default FilterList;

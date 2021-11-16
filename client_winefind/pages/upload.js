import styles from '../styles/Upload.module.css';
import { Card, Dropdown, Input, Button } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import router from 'next/router';

const Upload = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [values, setValues] = useState({
    userId: '',
    title: '',
    content: '',
    //밑에는 와인정보
    wineName: '',
    type: '',
    country: '',
    grape: '',
    vintage: '2020',
    sweet: '2',
    acidity: '2',
    body: '2',
    tannic: '2',
    image: '',
    wineContent: '',
    price: '',
  });

  const getUserInfo = () => {
    let token = localStorage.getItem('winefind');
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('res:', res.data);
        setUserInfo(res.data.userInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChange = (prop) => (event) => {
    if (prop === 'country' || prop === 'type') {
      setValues({ ...values, [prop]: event.target.textContent });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:2c0786f6-5e2d-4f84-a3bc-9bd78b8fd55e', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'mywinefindimagebucket',
        Key: userInfo.id + '-wine-' + file.name,
        Body: file,
      },
    });
    // 서버한테 이미지 주소를 보내주면 끝

    const promise = upload.promise();

    promise.then(
      function (data) {
        // alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      }
    );
  };

  const uploadArticle = () => {
    if (image == undefined) {
      alert('이미지를 선택해 주세요');
    } else {
      let url = `https://mywinefindimagebucket.s3.ap-northeast-2.amazonaws.com/${
        userInfo.id + '-wine-' + image.name
      }`;

      if (
        values.title !== '' &&
        values.content !== '' &&
        values.wineName !== '' &&
        values.type !== '' &&
        values.country !== '' &&
        values.grape !== '' &&
        values.wineContent !== '' &&
        values.price !== '' &&
        values.vintage > 0 &&
        values.price > 0
      ) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/article`,
            {
              userId: userInfo.id,
              title: values.title,
              content: values.content,
              wines: [
                {
                  wineName: values.wineName,
                  type: values.type,
                  country: values.country,
                  grape: values.grape,
                  vintage: values.vintage,
                  sweet: values.sweet,
                  acidity: values.acidity,
                  body: values.body,
                  tannic: values.tannic,
                  image: url,
                  content: values.wineContent,
                  price: values.price,
                },
              ],
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log('정보 수정이 완료되었습니다.');
            //배포할때 고려해.
            router.push('/mall');
          })
          .catch((e) => {
            console.log('게시글 업로드 실패', e);
          });
      } else {
        alert('유효한 값을 입력해주세요.');
      }
    }
  };

  const typeOptions = [
    {
      key: 'red',
      text: 'red',
      value: 'red',
    },
    {
      key: 'white',
      text: 'white',
      value: 'white',
    },
    {
      key: 'sparkling',
      text: 'sparkling',
      value: 'sparkling',
    },
    {
      key: 'rose',
      text: 'rose',
      value: 'rose',
    },
  ];
  const countryOptions = [
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'cl', value: 'cl', flag: 'cl', text: 'Chile' },
    { key: 'fr', value: 'fr', flag: 'fr', text: 'France' },
    { key: 'de', value: 'de', flag: 'de', text: 'Germany' },
    { key: 'nz', value: 'nz', flag: 'nz', text: 'New Zealand' },
    { key: 'us', value: 'us', flag: 'us', text: 'USA' },
    { key: 'it', value: 'it', flag: 'it', text: 'Italy' },
    { key: 'es', value: 'es', flag: 'es', text: 'Spain' },
    { key: 'za', value: 'za', flag: 'za', text: 'Repulic of South Africa' },
  ];
  let taste = (
    <table className={styles.tasteStructure}>
      <tbody>
        {/* 여기서부턴 Light && Bold */}
        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Light</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min='0'
                max='4'
                step='1'
                type='range'
                className={styles.taste_bar}
                onChange={handleChange('body')}
              />
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Bold</div>
          </td>
        </tr>

        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Smooth</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min='0'
                max='4'
                step='1'
                type='range'
                className={styles.taste_bar}
                onChange={handleChange('Tannic')}
              />
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Tannic</div>
          </td>
        </tr>

        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Dry</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min='0'
                max='4'
                step='1'
                type='range'
                className={styles.taste_bar}
                onChange={handleChange('sweet')}
              />
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Sweet</div>
          </td>
        </tr>

        <tr className='tasteStructure_tasteCharacteristic'>
          <td>
            <div className='tasteStructure_property'>Soft</div>
          </td>
          <td className={styles.tasteStructure_progressBar}>
            <div className={styles.tastebar_container}>
              <input
                min='0'
                max='4'
                step='1'
                type='range'
                className={styles.taste_bar}
                onChange={handleChange('acidity')}
              />
            </div>
          </td>
          <td>
            <div className='tasteStructure_property'>Acidic</div>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.board_layout}>
        <div className={styles.wineName_writer}>
          <div className={styles.wineName}>&nbsp;Upload Wine</div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_info}>
            <div className={styles.title_article}>와인 상세 정보</div>
            <div className={styles.wine_info}>
              <div className={styles.wine_info_2}>
                <div>Wine name</div>
                <Input
                  style={{ width: '400px', color: 'black' }}
                  type='text'
                  placeholder='Type wine name'
                  onChange={handleChange('wineName')}
                />
                <br />
                <br />
                <div>Type</div>
                <Dropdown
                  style={{ width: '200px' }}
                  placeholder='Select Type'
                  onChange={handleChange('type')}
                  fluid
                  selection
                  options={typeOptions}
                />
                <br />
                <div>Country</div>
                <Dropdown
                  style={{ width: '400px' }}
                  placeholder='Select Country'
                  onChange={handleChange('country')}
                  fluid
                  selection
                  options={countryOptions}
                />
                <br />
                <div>Grape</div>
                <Input
                  style={{ width: '200px' }}
                  placeholder='Type Grape'
                  onChange={handleChange('grape')}
                />
                <br />
                <br />
                <div>Vintage</div>
                <Input
                  style={{ width: '200px' }}
                  type='number'
                  onChange={handleChange('vintage')}
                  defaultValue='2020'
                  max='2020'
                  min='1000'
                  placeholder='Type vintage'
                />
                <br />
                <br />
                <div>Price(₩)</div>
                <Input
                  style={{ width: '200px' }}
                  type='number'
                  onChange={handleChange('price')}
                  defaultValue='0'
                  min='10000'
                  step='5000'
                  placeholder='Type price'
                />
                <br />
                <br />
                <div>Comment</div>
                <textarea
                  style={{ width: '400px' }}
                  className={styles.textarea_wine}
                  placeholder='Comment about your wine'
                  onChange={handleChange('wineContent')}
                ></textarea>
              </div>
              <div className={styles.board_image}>
                <Card className={styles.card_height}>
                  <div
                    className={styles.img_box}
                    style={{ backgroundImage: `url(${createObjectURL})` }}
                  >
                    {createObjectURL ? '' : 'Upload Wine Image!'}
                  </div>
                  {/* <img src={createObjectURL} className={styles.keepimg} /> */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '10px',
                    }}
                  >
                    <input
                      style={{ width: '200px' }}
                      type='file'
                      onChange={handleFileInput}
                    />
                  </div>
                  <Card.Content>
                    <Card.Header className={styles.card_head}>
                      Describe taste of the Wine!
                    </Card.Header>
                    {taste}
                  </Card.Content>
                </Card>
              </div>
            </div>

            <div className={styles.title_article}>게시글 정보</div>
            <div className={styles.comment_article}>
              <Input
                type='text'
                style={{ width: '300px' }}
                placeholder='Title here!'
                onChange={handleChange('title')}
              />
              <textarea
                className={styles.textarea}
                placeholder='Comment about your wine'
                onChange={handleChange('content')}
              ></textarea>
            </div>

            <Button
              style={{
                width: '350px',
                height: '80px',
                alignSelf: 'center',
                margin: '20px',
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

import React, { useState } from 'react';
import styles from '../styles/User.module.css';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Edit = ({
  handleClickShowPassword,
  handleEditChange,
  handleFileInput,
  createObjectURL,
  userInfo,
  values,
  editUserInfo,
}) => {
  return (
    <>
      <div>
        <div className={styles.image_container}>
          <img
            src={createObjectURL}
            style={{
              backgroundColor: 'white',
              backgroundImage: `url(${createObjectURL ? '' : userInfo.image})`,
            }}
            className={styles.image}
          />
          <label className={styles.image_uploader} htmlFor='input-file'>
            Upload File
          </label>
          <input
            type='file'
            id='input-file'
            style={{ display: 'none' }}
            onChange={handleFileInput}
          />
        </div>
        {/* 유저네임 보여주는 기능 */}
        <Input
          className={styles.text}
          type='text'
          placeholder={userInfo.username}
          onChange={handleEditChange('username')}
        />
        {/* 비밀번호 수정/ 보기 기능 */}
        <Input
          className={styles.text}
          type={values.showPassword ? 'text' : 'password'}
          onChange={handleEditChange('password')}
          placeholder='Enter PASSWORD'
          value={values.password}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={handleClickShowPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <button className={styles.btn} onClick={editUserInfo}>
        EDIT
      </button>
      ;
    </>
  );
};

export default Edit;

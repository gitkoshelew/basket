import React from 'react';
import logo from '../../../logo.svg';
import styles from './style.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <img className={styles.loader__img} src={logo} alt="logo" />
  </div>
);

export default Loader;

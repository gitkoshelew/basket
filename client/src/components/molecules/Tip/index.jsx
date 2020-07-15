import React from 'react';
import styles from './style.module.scss';

const Tip = ({ messages, clickHandler }) => (
  <div className={styles.tip} onClick={clickHandler}>
    {messages.map((message, index) => (
      <p className={styles.tip__message} key={index}>
        Error: {message.toString()}
      </p>
    ))}
    <p className={styles.tip__message}>Try Again, Please.</p>
  </div>
);

export default Tip;

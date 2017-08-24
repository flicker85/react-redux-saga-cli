import React from 'react';
import styles from './index.less';

export default function({ children }) {
  return (
    <div className={ styles.normal }>
      { children }
    </div>
  );
}
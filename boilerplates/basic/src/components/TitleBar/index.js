import React from 'react';
import styles from './index.less';

export default function({ title }) {
  return (
    <div className={ styles.normal }>{ title }</div>
  );
}
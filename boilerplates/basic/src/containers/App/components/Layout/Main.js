import React from 'react';
import Sider from './Sider';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './Main.less';

function Main({ children, pathname, collapsed, menu }) {
  return (
    <div className={ styles.normal }>
      { menu ? <Sider pathname={ pathname } collapsed={ collapsed } menu={ menu } /> : null }
      <Scrollbars style={{ width: 'auto' }}>
      { children }
      </Scrollbars>
    </div>
  );
}

export default Main;
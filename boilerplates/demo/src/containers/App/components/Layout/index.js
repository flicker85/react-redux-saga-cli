import React from 'react';
import Header from './Header';
import Main from './Main';
import styles from './index.less';
import { menu, horizontal } from 'config/menu';

export default function({ children, pathname, collapsed, user, toggleCollapsed, logout }) {
  const headerProps = horizontal ? { user, pathname, menu, logout } : { user, collapsed, toggleCollapsed, logout };
  const mainProps = horizontal ? {} : { pathname, collapsed, menu };
  return (
    <div className={ styles.normal }>
      <Header { ...headerProps } />
      <Main { ...mainProps }>{ children }</Main>
    </div>
  );
}
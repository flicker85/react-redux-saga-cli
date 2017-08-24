import React from 'react';
import styles from './Header.less';
import { Link } from 'react-router';
import { Menu, Button, Icon } from 'antd';
const { SubMenu } = Menu;

function Header({ collapsed, toggleCollapsed, menu, pathname, logout, user: { name } }) {
  const loop = data => data.map((item) => {
    if(item.children) {
      return (
        <SubMenu key={item.url} title={<span>{item.icon ? <Icon type={item.icon} /> : null}<span>{item.title}</span></span>}>
          { loop(item.children) }
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.url} >
        <Link to={item.url}>
          {item.icon ? <Icon type={item.icon} /> : null}<span>{item.title}</span>
        </Link>
      </Menu.Item>
    );
  });

  function handleClick(e) {
    switch(e.key) {
      case 'logout':
        logout();
        break;
    }
  }

  return (
    <div className={ styles.normal }>
      <div className={ styles.logo } style={ collapsed ? { width: 64 } : {} }>{ collapsed ? 'APP' : 'React APP' }</div> 
      <div className={ styles.header }>
        { menu ? null : <a href="#" className={ styles.btnCollapsed } onClick={ toggleCollapsed }><Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} /></a> }
        { menu ? <Menu mode="horizontal" selectedKeys={[pathname]} className={ styles.menu }>{ loop(menu) }</Menu> : null }
        <div className={ styles.rightWarpper }>
          <a href="#" className={ styles.btn }><Icon type="mail" /></a>
          <a href="#" className={ styles.btn }><Icon type="bell" /></a>
          <Menu mode="horizontal" className={ styles.btnUser } onClick={handleClick}>
            <Menu.SubMenu title={<span><Icon type="user" />{name} <Icon type="down" /></span>}>
              <Menu.Item key="logout">
                <Icon type="logout" />Logout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
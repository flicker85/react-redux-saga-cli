import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import styles from './Sider.less'
const { SubMenu } = Menu;

function Sider({ pathname, collapsed, menu }) {
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

  return (
    <div className={ styles.normal } style={ collapsed ? { width: 64 } : { overflowY: 'auto' } }>
      <Menu
        className={ styles.menu }
        mode="inline"
        theme="dark"
        inlineCollapsed={ collapsed }
        selectedKeys={[pathname]}
      >
        { loop(menu) }
      </Menu>
    </div>
  );
}

export default Sider;
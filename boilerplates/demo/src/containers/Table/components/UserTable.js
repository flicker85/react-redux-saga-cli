import React from "react";
import { Table } from "antd";
import UserModal from './UserModal';
const { Column } = Table;

export default function({ data, onEdit, onRemove }) {
  function remove(id, e) {
    e && e.preventDefault();
    onRemove(id);
  }

  return (
    <Table dataSource={data} size="middle" rowKey="id">
      <Column title="序号" render={ (text, record, index) => index + 1 } />
      <Column title="姓名" dataIndex="name" key="name" />
      <Column title="年龄" dataIndex="age" key="age" />
      <Column title="地址" dataIndex="address" key="address" />
      <Column
        title="操作"
        key="op"
        render={(text, record) => (
          <span>
            <UserModal record={ record } onOk={ onEdit.bind(null, record.id) } title="修改用户">
              <a href="#">修改</a>
            </UserModal>
            <span className="ant-divider" />
            <a href="#" onClick={ remove.bind(null, record.id) }>删除</a>
          </span>
        )}
      />
    </Table>
  );
}

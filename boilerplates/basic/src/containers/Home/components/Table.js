import React from "react";
import { Table } from "antd";
const { Column } = Table;

export default function({ data }) {
  return (
    <Table dataSource={data} pagination={false} size="middle" rowKey="id">
      <Column title="id" dataIndex="id" key="id" />
      <Column title="name" dataIndex="name" key="name" />
      <Column title="age" dataIndex="age" key="age" />
      <Column title="address" dataIndex="address" key="address" />
    </Table>
  );
}

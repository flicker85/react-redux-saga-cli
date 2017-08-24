import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { TitleBar, Content } from '../../components';
import { UserTable, UserModal } from './components';
import { RESET, CREATE, REMOVE, EDIT } from './redux/constants';
import styles from './index.less';

class Table extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }

  createHandler = (values) => {
    this.props.dispatch({
      type: CREATE,
      payload: values,
    });
  }

  editHandler = (id, values) => {
    this.props.dispatch({
      type: EDIT,
      payload: { id, values },
    });
  }

  removeHandler = (id) => {
    this.props.dispatch({
      type: REMOVE,
      payload: id,
    });
  }

  render() {
    return (
      <Content>
        <TitleBar title='Table' />
        <div className={ styles.normal }>
          <UserModal record={{}} onOk={ this.createHandler } title="新增用户">
            <Button type="primary" style={{ marginBottom: 10 }}>新增用户</Button>
          </UserModal>
          <UserTable data={ this.props.table } onEdit={ this.editHandler } onRemove={ this.removeHandler } />
        </div>
      </Content>
    );
  }
}

export default connect(state => state.table)(Table);
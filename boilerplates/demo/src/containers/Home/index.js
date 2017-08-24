import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleBar, Content } from '../../components';
import { Chart, Table } from './components';
import { RESET } from './redux/constants';
import '../../config/macarons';

class Home extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  render() {
    const { chart, table } = this.props
    return (
      <Content>
        <TitleBar title='统计图' />
        <Chart data={ chart } />
        <TitleBar title='数据表' />
        <Table data={ table } />
      </Content>
    );
  }
}

export default connect(state => state.home)(Home);

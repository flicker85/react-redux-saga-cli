import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleBar, Content } from '../../components';
import Table from './components/Table';
import { RESET } from './redux/constants';

class Home extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  render() {
    return (
      <Content>
        <TitleBar title='HOME' />
        <Table data={ this.props.table } />
      </Content>
    );
  }
}

export default connect(state => state.home)(Home);

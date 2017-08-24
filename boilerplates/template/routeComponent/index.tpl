import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleBar, Content } from '../../components';
import { RESET } from './redux/constants';

class {{componentName}} extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  
  render() {
    return (
      <Content>
        <TitleBar title='{{componentName}}' />
        <div>{ this.props.test }</div>
      </Content>
    );
  }
}

export default connect(state => state.{{key}})({{componentName}});
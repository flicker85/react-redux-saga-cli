import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Layout from './components/Layout';
import { SIDER_COLLAPSED, LOGOUT } from './redux/constants';

class App extends Component {
  toggleCollapsed = (e) => {
    e && e.preventDefault();
    const { dispatch, collapsed } = this.props;
    dispatch({
      type: SIDER_COLLAPSED,
      payload: !collapsed
    });
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch({ type: LOGOUT });
    dispatch(push('/login'));
  }

  render() {
    const { pathname, collapsed, user } = this.props;
    const LayoutProps = {
      pathname,
      collapsed,
      user,
      toggleCollapsed: this.toggleCollapsed,
      logout: this.logout,
    };

    return (
      <Layout { ...LayoutProps }>{ this.props.children }</Layout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.global,
    pathname: props.location.pathname
  };
}

export default connect(mapStateToProps)(App);
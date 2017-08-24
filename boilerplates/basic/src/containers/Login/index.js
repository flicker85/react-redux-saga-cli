import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Form, Input, Icon, message } from 'antd';
import { LOGIN } from './redux/constants';
import { push } from 'react-router-redux';
import styles from './index.less';

const FormItem = Form.Item

function Login({ form: { getFieldDecorator, validateFieldsAndScroll }, dispatch }) {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({
        type: LOGIN,
        ...values,
        callback: {
          success() {
            dispatch(push('/'));
          },
          fail() {
            message.error('wrong user name or password.')
          }
        }
      });
    })
  }

  return (
    <div className={styles.normal}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <span>React App</span>
        </div>
        <form>
          <FormItem>
            {getFieldDecorator('uid', {
              rules: [{ required: true, message: 'please enter your username.' }],
            })(<Input prefix={<Icon type="user" />} size="large" onPressEnter={handleOk} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'please enter your password.' }],
            })(<Input prefix={<Icon type="lock" />} size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk}>Login</Button>
            <p>
              username: admin&nbsp;&nbsp;&nbsp;&nbsp;password: 123
            </p>
          </Row>
        </form>
      </div>
    </div>
  )
}

export default connect()(Form.create()(Login));
//export default Form.create()(Login);
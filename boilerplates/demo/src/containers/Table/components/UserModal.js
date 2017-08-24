import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    };
  }

  showModal = (e) => {
    e && e.stopPropagation();
    e && e.preventDefault();
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState(
      { visible: false }//,
      // function() {
      //   this.props.form.resetFields();
      // }
    );
  };

  okHandler = () => {
    const values = this.props.form.getFieldsValue();
    this.props.onOk(values);
    this.hideModal();
  }

  render() {
    const { children, title } = this.props;
    const { visible } = this.state;

    const { getFieldDecorator } = this.props.form;
    const { name, age, address } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={ this.showModal }>{ children }</span>
        <Modal
          title={ title }
          visible={ visible }
          onOk={this.okHandler}
          onCancel={this.hideModal}
        >
        <Form>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年龄"
            >
              {
                getFieldDecorator('age', {
                  initialValue: age,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {
                getFieldDecorator('address', {
                  initialValue: address,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

// export default UserModal;
export default Form.create()(UserModal);
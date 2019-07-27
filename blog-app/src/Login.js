import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css'
import axios from 'axios'
import { createHashHistory } from 'history';

const history = createHashHistory();

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(
          "https://www.easy-mock.com/mock/5d380f53f4fa30393e8b8a72/login/login",
          {params:{values}}
        ).then(response => {
          if (response.data.status == 200) {
            history.push('/BlogList')
          }
          else {
            alert('error!')
          }
          //console.log(response)
        })
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-div">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码？
          </a>
            <br />
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
          </Button>
            Or <a href="/#/Register">现在注册!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm
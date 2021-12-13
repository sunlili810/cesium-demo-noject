import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Form, Input, Button, Checkbox, Modal
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import LoginStore from 'store/loginstore';
import logo from 'images/login-logo.png';
import lg02 from 'images/lg02.png';
import './login.less';
import Header from '../header/header';

const FormItem = Form.Item;
const loginUrl = 'login';
const store = new LoginStore();

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleLogo: logo,
      projectid: '',
      projectname: ''
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  componentWillMount() {
    const projectid = localStorage.getItem('PROJECTID');
    // if(projectid!== null){
    //  const myIndex =  `${window.routername}/index`;
    //  this.props.history.push(myIndex);
    // }

  }

  onFinish = (values) => {
    // const tempParameters = this.encryption(values.userName, values.password);
    const param = {
      loadingFlag: false,
      url: '/appext/reactbaseapp/login',
      method: 'POST',
      data: {
        loginname: values.userName,
        agentpwd: values.password
      }, // tempParameters,
      querySuccess: this.loginSuccess,
      errorFn(data){
        Modal.error({
          content: data
        });
      }
    };
    store.login(param);
  };

  loginSuccess(data) {

    localStorage.setItem('projectid', data.data.projectid);

      const myIndex = `${window.routername}/hindex?projectid=${data.data.projectid}`;
      //this.props.history.push(myIndex);
      return <Navigate to={myIndex} replace />;



  }

  render() {
    const { titleLogo } = this.state;
    return (
      <div className="login">
        <Header devname={window.headTitle} />
        <div className="container-out">
          {/* <img src={lg02} className="bflogo" alt="" /> */}
          <div className="container">
            <div className="content">
              <div className="logo">
                {/* <img src={titleLogo} alt="" /> */}
                登录
              </div>
              <Form onFinish={this.onFinish} className="login-form">
                <FormItem
                  name="userName"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    autoComplete="off"

                  />
                </FormItem>
                <FormItem
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input
                    size="large"
                    prefix={(<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />)}
                    type="password"
                    placeholder="密码"

                  />
                </FormItem>
                <FormItem>
                  {/* {getFieldDecorator('remember', { */}
                  {/* valuePropName: 'checked', */}
                  {/* initialValue: true */}
                  {/* })(<Checkbox>记住密码</Checkbox>)} */}
                  {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                  <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  {/* <Button type="primary" size="large" onClick={this.loginFalse} className="login-form-button"> */}
                  {/* 登录 */}
                  {/* </Button> */}
                  {/* <a href="">注册</a> */}
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageComponent.propTypes = {
  // form: PropTypes.object.isRequired,
  //history: PropTypes.object.isRequired
};
export default PageComponent;

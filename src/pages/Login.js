import React from 'react';
import {withRouter} from "react-router-dom";
import { post } from '../utils/request';
import { Icon, Form, Input, Button, message } from 'antd';
import style from '../styles/login-page.less';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err) {
        post('http://localhost:3000/login',values)
          .then((res) => {
            if(res) {
              message.info('登录成功');
              this.props.history.push('/');
            } else {
              message.info('登录失败，账号或密码错误');
            }
          })
      }
    })
  }

  render () {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className={style.wrapper}>
        <div className={style.body}>
          <header className={style.header}>
            祀念的book
          </header>

          <section className={style.form}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [
                    {
                      required:true,
                      message:'请输入账号',
                      type:'string'
                    }
                  ]
                })(
                  <Input type="text" addonBefore={<Icon type='user' />} />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required:true,
                      message:'请输入密码',
                      type:'string'
                    }
                  ]
                })(
                  <Input type="password" addonBefore={<Icon type='lock' />} />
                )}
              </FormItem>
              <Button className={style.btn} type="primary" htmlType="submit">Sign In</Button>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

Login = Form.create()(Login);
export default withRouter(Login);

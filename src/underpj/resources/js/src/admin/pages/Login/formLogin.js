import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { connect} from 'react-redux';

import CookieService from '../../cookies';
import usersServices from '../../services/usersServices';
import { setUserLogin } from '../../redux/actions/usersActions';

const FormLogin = (props) => {
    const history = useHistory();

    const onLogin = (values) => {
        usersServices.login(values).then(res => {
            if(res.data.success) {
                const options = res.data.expires_at ? {path:'/', expires:(new Date(res.data.expires_at))} : {path:'/'}
                CookieService.set('access_token', res.data.access_token, options);
                CookieService.set('token_type', res.data.token_type, options);

                props.setUserLogin(res.data.data);
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
            }
            return res;
        }).then((res) => {
            if(res.data.success) {
                history.push('/admin/users-manager');
                notification['success']({
                    message: 'Thông báo',
                    description: 'Đăng nhập thành công'
                });
            }
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Đã xảy ra lỗi trong quá trình đăng nhập'
            });
            console.log(err)
        })
    };

    return (
        <Row>
            <Col span={8}/>
            <Col span={8}>
                <Form
                    name="login"
                    className="login-form"
                    style={{
                        marginTop: 50 + 'px',
                        paddingBottom: 50 + 'px'
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onLogin}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập vào email của bạn!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'vui lòng nhập vào mật khẩu của bạn!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                        Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default connect(null, {setUserLogin})(FormLogin);

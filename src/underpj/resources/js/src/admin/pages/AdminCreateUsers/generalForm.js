import React from 'react';
import { Col, Form, Input, DatePicker, Cascader } from 'antd';

const userType = [
    {
        value: '1',
        label: 'Admin'
    },
    {
        value: '2',
        label: 'Nhân viên điều hành'
    },
    {
        value: '3',
        label: 'Cửa hàng'
    },
    {
        value: '4',
        label: 'Cộng tác viên'
    }
];

const GeneralForm = (props) => {

    let { setUserTypeValue } = props

    return (
        <Col span={12}>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'E-mail bạn nhập vào không chính xác!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng nhập E-mail của bạn!',
                    },
                ]}
            >
                <Input  />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu của bạn!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="password_confirmation"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận lại mật khẩu của bạn!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="name"
                label="Họ tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ và tên của bạn!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="birthday"
                label="Ngày sinh"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập ngày sinh của bạn!'
                    }
                ]}
            >
                <DatePicker style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                name="tel"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="user_type"
                label="Loại tài khoản"
                rules={[
                    { required: true, message: 'Vui lòng chọn loại tài khoản!' },
                ]}
            >
                <Cascader
                    options={userType}
                    style={{textAlign: 'left'}}
                    onChange={(val) => {setUserTypeValue(val[0])}}
                />
            </Form.Item>

        </Col>
    )
}

export default GeneralForm;

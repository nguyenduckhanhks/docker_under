import React, { useState } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    notification
} from 'antd';
import { Link } from 'react-router-dom';

import usersServices from '../../services/usersServices';
import GeneralForm from './generalForm';
import CtvForm from './ctvForm';
import ShopForm from './shopForm';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

const USER_ADMIN = 1;
const USER_SYSTEM_EMPLOYEE = 2;
const USER_SHOP = 3;
const USER_CTV = 4;

const AdminCreateUsers = () => {

    const [form] = Form.useForm();
    const [userTypeValue, setUserTypeValue] = useState(1);

    const onAddUsersByAdmin = (values) => {
        values['user_type'] = values['user_type'][0];
        usersServices.createUsersByAdmin(values).then((res) => {
            if(res.data.success) {
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                });
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                });
            }
        })
    }

    return (
        <div>
            <Row>
                <Col md={19}>
                    <h1 className="custom-title">
                        Thêm người dùng
                    </h1>
                </Col>
                <Col md={5}>
                    <Button
                        style={{margin: '25px 0px'}}
                        type="primary"
                    >
                        <Link to="users-manager" className="text-white">
                            Quản lý tài khoản
                        </Link>
                    </Button>
                </Col>
            </Row>
            <Form
                {...formItemLayout}
                form={form}
                name="createUsers"
                onFinish={onAddUsersByAdmin}
                initialValues={{
                    user_type: ['1'],
                    gender: 1
                }}
                scrollToFirstError
            >
                <Row>
                    {(userTypeValue == USER_ADMIN || userTypeValue == USER_SYSTEM_EMPLOYEE) && <Col span={6}></Col>}

                    <GeneralForm setUserTypeValue={setUserTypeValue}/>

                    { userTypeValue == USER_CTV &&
                        <CtvForm/>
                    }

                    { userTypeValue == USER_SHOP &&
                        <ShopForm/>
                    }
                </Row>
                <Row>
                    <Col span={12}/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
}

export default AdminCreateUsers;

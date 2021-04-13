import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Cascader,
    notification,
    message
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import usersServices from '../../services/usersServices';

const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
};

const userType = [
    {
        value: null,
        label: 'Chọn loại tài khoản'
    },
    {
        value: 1,
        label: 'Admin'
    },
    {
        value: 2,
        label: 'Nhân viên điều hành'
    },
    {
        value: 3,
        label: 'Cửa hàng'
    },
    {
        value: 4,
        label: 'Cộng tác viên'
    }
];

const userStatus = [
    {
        value: null,
        label: 'Chọn trạng thái'
    },
    {
        value: 1,
        label: 'Đang hoạt động'
    },
    {
        value: 0,
        label: 'Đang khóa'
    }
]

const SearchForm = (props) => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const onSearchUser = (values) => {
        setIsLoading(false)
        usersServices.searchUserByAdmin(values).then(res => {
            if(res.data.success) {
                let searchData = [];
                res.data.data.forEach(data => {
                    data['key'] = data['id']
                    searchData.push(data)
                })
                props.setUsers(searchData)
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                })
                setIsLoading(false)
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            }
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Đã xảy ra lỗi hệ thống!'
            })
        })
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onSearchUser}
            scrollToFirstError
        >
            <Row>
                <Col md={8}>
                    <Form.Item
                        name="name"
                        label="Họ tên"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col md={8}>
                    <Form.Item
                        name="tel"
                        label="Số điện thoại"
                    >
                        <Input/>
                    </Form.Item>
                </Col>

                <Col md={8}>
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col  md={8}>
                    <Form.Item
                        name="user_type"
                        label="Loại tài khoản"
                    >
                        <Cascader
                            options={userType}
                            style={{textAlign: 'left'}}
                        />
                    </Form.Item>
                </Col>
                <Col md={8}>
                    <Form.Item
                        name="active"
                        label="Trạng thái"
                    >
                        <Cascader
                            options={userStatus}
                            style={{textAlign: 'left'}}
                        />
                    </Form.Item>
                </Col>

                <Col md={8}>
                    <Row>
                        <Col md={12}>
                            <Form.Item style={{float: 'right'}}>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={isLoading}>
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col md={12}>
                            <Button type="primary" onClick={() => {
                                form.resetFields()
                            }}>
                                Làm lại
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Form>
    )
}

export default SearchForm

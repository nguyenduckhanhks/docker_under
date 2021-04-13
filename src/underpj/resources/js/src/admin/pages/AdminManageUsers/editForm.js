import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Drawer,
    Button,
    Row,
    Col,
    DatePicker,
    Cascader,
    notification
} from 'antd';
import moment from 'moment';

import usersServices from '../../services/usersServices';

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

const EditForm = (props) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        form.setFieldsValue(formatData())
    })

    const onCloseForm = () => {
        form.resetFields()
        props.setEditForm(false)
        setLoading(false)
    }

    const onEditUserById = (values) => {
        setLoading(true)
        values['id'] = props.userDetailData['id']
        values['user_type'] = values['user_type'][0];
        usersServices.updateUserByAdmin(values).then( res=> {
            if(res.data.success) {
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                })
                props.getAllUser()
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            }
        }).then(() => {
            setLoading(false)
            props.setEditForm(false)
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Lỗi hệ thống!'
            })
            setLoading(false)
            props.setEditForm(false)
        })
    }

    const formatData = () => {
        if(!props.userDetailData.id) return null
        let userData = props.userDetailData
        if(userData.type == USER_ADMIN || userData.type == USER_SYSTEM_EMPLOYEE)
            return {
                email: userData.email,
                name: userData.name,
                birthday: moment(new Date(userData.birthday)),
                tel: userData.tel,
                user_type: userType.filter(data => data.value == userData.type).map(data => data.value)
            }
        else if(userData.type == USER_SHOP)
            return {
                email: userData.email,
                name: userData.name,
                birthday: moment(new Date(userData.birthday)),
                tel: userData.tel,
                user_type: userType.filter(data => data.value == userData.type).map(data => data.value),
                address: userData.shop.address,
                price_service_percent: userData.shop.price_service_percent,
                price_service_max: userData.shop.price_service_max,
                banking_account_number: userData.shop.banking_account_number,
                banking_account_name: userData.shop.banking_account_name,
                banking_name: userData.shop.banking_name
            }
        else if(userData.type == USER_CTV)
            return {
                email: userData.email,
                name: userData.name,
                birthday: moment(new Date(userData.birthday)),
                tel: userData.tel,
                user_type: userType.filter(data => data.value == userData.type).map(data => data.value),
                address: userData.ctv.address,
                trademark: userData.ctv.trademark,
                banking_account_number: userData.ctv.banking_account_number,
                banking_account_name: userData.ctv.banking_account_name,
                banking_name: userData.ctv.banking_name
            }
    }

    return (
        <Drawer
            width={'70vw'}
            placement="right"
            closable={false}
            visible={props.editForm}
            onClose={onCloseForm}
        >
            <h1 className="text-center">CẬP NHẬT TÀI KHOẢN</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="editUser"
                onFinish={onEditUserById}
                scrollToFirstError
                initialValues={formatData()}
            >
                <Row>
                    {
                        (props.userDetailData.type == USER_ADMIN || props.userDetailData.type == USER_SYSTEM_EMPLOYEE) && <Col md={6}></Col>
                    }
                    <Col md={12}>
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
                                disabled
                            />
                        </Form.Item>

                    </Col>
                    {
                        (props.userDetailData.type == USER_SHOP) &&
                        <Col md={12}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập địa chỉ của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="price_service_percent"
                                label="Phần trăm chiết khấu"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập Phần trăm chiết khấu (trên một sản phẩm)!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="price_service_max"
                                label="Chiết khấu tối đa"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập chiết khấu tối đa (trên một sản phẩm)!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_account_number"
                                label="Số tài khoản ngân hàng"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập số tài khoản ngân hàng của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_account_name"
                                label="Tên chủ tài khoản"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập tên chủ tài khoản của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_name"
                                label="Tên ngân hàng"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập tên ngân hàng của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    }

{
                        (props.userDetailData.type == USER_CTV) &&
                        <Col md={12}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập địa chỉ của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="trademark"
                                label="Tên thương hiệu"
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_account_number"
                                label="Số tài khoản ngân hàng"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập số tài khoản ngân hàng của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_account_name"
                                label="Tên chủ tài khoản"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập tên chủ tài khoản của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="banking_name"
                                label="Tên ngân hàng"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập tên ngân hàng của bạn!'}
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    }
                </Row>
                <Row>
                <Col span={12}/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Drawer>
    )
}

export default EditForm;

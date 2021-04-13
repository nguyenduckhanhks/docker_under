import React from 'react';
import { Form, Input, Col, Radio } from 'antd';

const CtvForm = () => {
    return (
        <Col span={12}>
            <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                    { required: true, message: 'Vui lòng chọn giới tính của bạn!' },
                ]}
            >
                <Radio.Group>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={0}>Nữ</Radio>
                </Radio.Group>
            </Form.Item>

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
    )
}

export default CtvForm

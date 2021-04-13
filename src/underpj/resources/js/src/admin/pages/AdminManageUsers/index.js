import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    notification,
    Table,
    Collapse,
    Popconfirm,
    message
} from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import usersServices from '../../services/usersServices';
import './style.scss';
import ModalDetailUser from './modalDetail';
import SearchForm from './searchForm';
import EditForm from './editForm';

const { Panel } = Collapse
const USER_ADMIN = 1;
const USER_SYSTEM_EMPLOYEE = 2;
const USER_SHOP = 3;
const USER_CTV = 4;

const AdminManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [visible, setVisible] = useState(false)
    const [editForm , setEditForm] = useState(false)
    const [userDetailData, setUserDetailData] = useState({
        id: null,
        name: ''
    })

    useEffect(() => {
        getAllUser()
    }, []);

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return(
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => confirmUpdateStatus(record['id'])}
                        onCancel={cancelUpdateStatus}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='default' danger={text == 0}>
                            {text == 1 ? 'Đang hoạt động' : 'Đang khóa'}
                        </Button>
                    </Popconfirm>
                )
            }
        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'type',
            key: 'type',
            render: type => {
                if(type == USER_ADMIN) return 'Quản trị viên'
                if(type == USER_CTV) return 'Cộng tác viên'
                if(type == USER_SYSTEM_EMPLOYEE) return 'Nhân viên'
                if(type == USER_SHOP) return 'Cửa hàng'
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => {
                return(
                    <>
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            shape="circle"
                            style={{marginRight: 20 + 'px', marginBottom: 5 + 'px'}}
                            onClick={() => {
                                getUserDetailById(record.id)
                                setEditForm(true)
                            }}
                        />
                        {
                            (record.type == USER_CTV || record.type == USER_SHOP) &&
                            <>
                                <Button
                                    icon={<EyeOutlined />}
                                    type="default"
                                    shape="circle"
                                    style={{marginRight: 20 + 'px', marginBottom: 5 + 'px'}}
                                    onClick={() => {
                                            getUserDetailById(record.id)
                                            setVisible(true)
                                        }
                                    }
                                />
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    style={{marginRight: 20 + 'px', marginBottom: 5 + 'px'}}
                                />
                            </>
                        }
                    </>
                )
            }
        }
    ]

    const getAllUser = () => {
        usersServices.getAllUsers().then(res => {
            if(res.data.success) {
                let usersData = [];
                res.data.data.forEach(user => {
                    user.key = user.id;
                    usersData.push(user)
                });
                setAllUsers(usersData)
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            }
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Xảy ra lỗi trong quá trình lấy dữ liệu người dùng'
            })
        })
    }

    const getUserDetailById = (user_id) => {
        usersServices.getUserDataById({
            'user_id': user_id
        }).then(res => {
            if(res.data.success) {
                setUserDetailData(res.data.data)
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            } else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            }
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Đã xảy ra lỗi trong quá trình lấy dữ liệu!'
            })
        })
    }

    const updateStatusUsers = (user_id) => {
        let dataSend = {
            'user_id': user_id
        }
        usersServices.updateStatusUserByAdmin(dataSend).then(res => {
            if(res.data.success) {
                notification['success']({
                    message: 'Thông báo',
                    description: res.data.message
                })
                getAllUser()
            }
            else {
                notification['error']({
                    message: 'Thông báo',
                    description: res.data.message
                })
            }
        }).catch(err => {
            notification['error']({
                message: 'Thông báo',
                description: 'Xảy ra lỗi trong quá trình cập nhật!'
            })
        })
    }

    function confirmUpdateStatus(user_id) {
        updateStatusUsers(user_id)
    }

      function cancelUpdateStatus() {
        message.success('Đã hủy');
      }

    return(
        <div>
            <Row>
                <Col md={19}>
                    <h1 className="custom-title">
                        QUản lý người dùng
                    </h1>
                </Col>
                <Col md={5}>
                    <Button
                        style={{margin: '25px 0px'}}
                        type="primary"
                    >
                        <Link to="create-users" className="text-white">
                            Thêm tài khoản
                        </Link>
                    </Button>
                </Col>
            </Row>
            <Collapse accordion className="site-collapse-primary">
                <Panel header="Tìm kiếm" key="1" className="site-collapse-panel-primary">
                    <SearchForm setUsers={setAllUsers}/>
                </Panel>
            </Collapse><br/>
            <Table
                columns={columns}
                dataSource={allUsers}
                size="middle"
            />
            <ModalDetailUser
                visible={visible}
                setVisible={setVisible}
                userDetailData={userDetailData}
            />
            <EditForm
                editForm={editForm}
                setEditForm={setEditForm}
                userDetailData={userDetailData}
                getAllUser={getAllUser}
            />
        </div>
    )
}

export default AdminManageUsers

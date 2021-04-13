import React from 'react';
import { PageHeader, Dropdown, Menu, notification } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.scss';
import usersServices from '../../services/usersServices';
import CookieService from '../../cookies';
import { logout } from '../../redux/actions/usersActions';

const AdminHeader = (props) => {
    const history = useHistory();
    const onLogout = () => {
        usersServices.logout().then(res => {
            CookieService.remove('access_token');
            CookieService.remove('token_type');
            props.logout()
            return res
        }).then(res => {
            history.push('/admin/login')
            if(res.data.success) {
                notification['success']({
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

    const menu = (
        <Menu style={{marginRight: '10px'}}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Tài khoản
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={onLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
    );

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            extra={[
                <Dropdown.Button
                    overlay={menu}
                    key="1"
                    placement="bottomCenter"
                    icon={<UserOutlined style={{ fontSize: '30px' }} />}
                    style={{
                        border: 'none'
                    }}
                >
                </Dropdown.Button>
            ]}
        />
    )
}

export default connect(null,{logout})(AdminHeader)

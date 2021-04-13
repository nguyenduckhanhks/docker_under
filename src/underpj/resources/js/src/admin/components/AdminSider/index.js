import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'

import './style.scss';

const { Sider } = Layout;

const AdminSider = () => {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    return (
        <Sider
            collapsible
            onCollapse={onCollapse}
            collapsed={collapsed}
            className="sider"
        >
            <div className="logo-admin">Under VN</div>
            <div className="line"></div>
            <Menu className="sider-theme" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to={'users-manager'} >Quản lý người dùng</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<BarChartOutlined />}>
                nav 4
                </Menu.Item>
                <Menu.Item key="5" icon={<CloudOutlined />}>
                nav 5
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                nav 6
                </Menu.Item>
                <Menu.Item key="7" icon={<TeamOutlined />}>
                nav 7
                </Menu.Item>
                <Menu.Item key="8" icon={<ShopOutlined />}>
                nav 8
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default AdminSider;

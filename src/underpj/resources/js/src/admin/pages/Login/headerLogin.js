import React from 'react';
import {
    Row
} from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import icon_header_01 from '../../assets/images/icon-header-01.png';
import icon_header_02 from '../../assets/images/icon-header-02.png';
import logo from '../../assets/images/logo.png';

const HeaderLogin = () => {
    return(
        <div className="container-menu-header">
            <Row className="topbar">
                <div className="topbar-social">
                    <Link to={'abc'}>
                        <FacebookOutlined />
                    </Link>
                </div>
                <span>
                    Free shipping với đơn hàng từ 500k
                </span>
                <div className="topbar-child2">
                    <div className="topbar-email">
                        under@gmail.com
                    </div>
                </div>
            </Row>
            <Row className="wrap_header">
                <a href="/" className="logo">
                    <img src={logo} alt="IMG-LOGO"/>
                </a>

                <div className="wrap_menu">
                    <nav className="menu">
                        <ul className="main_menu">
                            <li>
                                <a href="/">Home</a>
                            </li>

                            <li>
                                <a href="/danh-muc-san-pham">Catagory </a>
                            </li>

                            <li>
                                <a href="/gio-hang">Cart</a>
                            </li>
                            <li>
                                <a href="admin/wallet">Wallet</a>
                            </li>
                            <li>
                                <a href="admin/orders">Orders</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="header-icons">
                    <a href="admin/users/profile" className="header-wrapicon1 dis-block">
                        <img src={icon_header_01} className="header-icon1" alt="ICON"/>
                    </a>

                    <span className="linedivide1"></span>

                    <div className="header-wrapicon2">
                        <a href="/gio-hang">
                            <img src={icon_header_02} className="header-icon1 js-show-header-dropdown" alt="ICON"/>
                            <span className="header-icons-noti">0</span>
                        </a>
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default HeaderLogin

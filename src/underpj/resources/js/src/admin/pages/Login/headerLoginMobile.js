import React, { useState } from 'react';
import { Row } from 'antd';

import icon_header_01 from '../../assets/images/icon-header-01.png';
import icon_header_02 from '../../assets/images/icon-header-02.png';
import logo from '../../assets/images/logo.png';

const LoginHeaderMobile = () => {
    const [isSlide, setIsSlide] = useState(false)

    return (
        <Row>
            <div className="wrap_header_mobile">
                <a href="/" className="logo-mobile">
                    <img src={logo} alt="IMG-LOGO"/>
                </a>
                <div className="btn-show-menu">
                    <div className="header-icons-mobile">
                        <div className="header-wrapicon2">
                            <a href="admin/users/profile" className="header-wrapicon1 dis-block">
                                <img src={icon_header_01} className="header-icon1" alt="ICON"/>
                            </a>
                            <span className="linedivide2"></span>
                        </div>
                        <div className="header-wrapicon2">
                            <a href="/gio-hang">
                                <img src={icon_header_02} className="header-icon1 js-show-header-dropdown" alt="ICON"/>
                                <span className="header-icons-noti">0</span>
                            </a>
                        </div>
                    </div>
                    <div
                        className={"btn-show-menu-mobile hamburger hamburger--squeeze " + (isSlide && ' is-active')}
                        onClick={() => {
                            setIsSlide(!isSlide)
                            $('.wrap-side-menu').slideToggle();
                        }}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="wrap-side-menu" style={{display: 'none'}}>
                <nav className="side-menu">
                    <ul className="main-menu" style={{padding: 0}}>
                        <li className="item-topbar-mobile p-l-20 p-t-8 p-b-8">
                            <span className="topbar-child1">
                                Free shipping với đơn hàng từ 500K!
                            </span>
                        </li>
                        <li className="item-topbar-mobile p-l-20 p-t-8 p-b-8">
                            <div className="topbar-child2-mobile">
                                <span className="topbar-email">
                                    under@gmail.com
                                </span>
                            </div>
                        </li>
                        <li className="item-topbar-mobile p-l-10">
                            <div className="topbar-social-mobile">
                                <a href="<?php echo $contactinfo['Facebook'] ?>" className="topbar-social-item fa fa-facebook"></a>
                            </div>
                        </li>
                        <li className="item-menu-mobile">
                            <a href="/">Home</a>
                        </li>
                        <li className="item-menu-mobile">
                            <a href="/danh-muc-san-pham">Catagory </a>
                        </li>
                        <li className="item-menu-mobile">
                            <a href="/gio-hang">Cart</a>
                        </li>
                        <li className="item-menu-mobile">
                            <a href="admin/wallet">Wallet</a>
                        </li>
                        <li className="item-menu-mobile">
                            <a href="admin/orders">Orders</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Row>
    )
}

export default LoginHeaderMobile

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Layout, notification } from 'antd';

import AdminHeader from '../AdminHeader';
import AdminFooter from '../AdminFooter';
import AdminSider from '../AdminSider';
import routes from '../../routes';
import { setUserLogin } from '../../redux/actions/usersActions'
import usersServices from '../../services/usersServices';

const { Content } = Layout;

const AdminLayout = (props) => {
    const history = useHistory();
    const [isGetUserLogin, setIsGetUserLogin] = useState(false)

    // Get user login
    useEffect(() => {
        if(!isGetUserLogin) {
            usersServices.getUserLogin().then(res => {
                setIsGetUserLogin(true)
                return res
            }).then((res) => {
                if(res.data.success) {
                    props.setUserLogin(res.data.data)
                } else {
                    history.push('login')
                }
            }).catch(() => {
                history.push('login')
                notification['error']({
                    message: 'Thông báo',
                    description: 'Xảy ra lỗi trong quá trình lấy thông tin người dùng'
                });
            })
        }
    })

    if(Object.keys(props.userLoginData).length === 0) return (
        <>
            {routes}
        </>
    )

    return (
        <>
            <Layout>
                <AdminSider/>
                <Layout
                    className="site-layout"
                    style={{
                        overflow: 'auto'
                    }}
                >
                <AdminHeader/>
                <Content style={{ margin: '24px 16px 0'}}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', overflow: 'auto'}}>
                        {routes}
                    </div>
                </Content>
                <AdminFooter/>
                </Layout>
            </Layout>
        </>
    )
}

const mapStateToProps = state => ({
    userLoginData: state.userLoginData
})

export default connect(mapStateToProps, {setUserLogin})(AdminLayout);

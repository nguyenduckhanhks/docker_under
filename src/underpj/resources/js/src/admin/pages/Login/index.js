import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import HeaderLogin from './headerLogin';
import LoginHeaderMobile from './headerLoginMobile'
import FormLogin from './formLogin';
import FooterLogin from './footerLogin';
import './style.scss';

const Login = (props) => {
    const [windownWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    })

    const history = useHistory();

    if(Object.keys(props.userLoginData).length !== 0) history.push('/admin/users-manager');

    return (
        <div>
            {
                windownWidth > 780 ? <HeaderLogin/> :
                <LoginHeaderMobile/>
            }
            <Row>
                <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m">
                    <h2 className="l-text2 t-center">
                        Đăng Nhập
                    </h2>
                </section>
            </Row>
            <FormLogin/>
            <FooterLogin/>
        </div>
    )
}

const mapStateToProps = state => ({
    userLoginData: state.userLoginData
})

export default connect(mapStateToProps)(Login);

import React from 'react';
import { Row, Col } from 'antd';

const FooterLogin = () => {
    return (
        <footer className="bg6 p-t-45 p-l-45 p-r-45">
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="p-t-30" style={{paddingLeft: 25 + 'px'}}>
                    <h4 className="s-text12 p-b-30">
                        THÔNG TIN LIÊN HỆ
                    </h4>
                        <div className="p-b-9 s-text8">
                            Nếu có bất kỳ câu hỏi nào hãy cho chúng tớ biết hoặc cậu có thể gọi tới (+84) 01234567891.<br/>
                            <strong>HỘ KINH DOANH LÊ QUỐC VIỆT ANH</strong><br/>
                            <strong>MKD:</strong> 04D8003835 - 03/08/2020<br/>
                            <strong>MST:</strong> 8535647584 (Cấp ngày 03/07/2018) <br/>
                            <strong>Địa chỉ:</strong> Hoàng Mai 1<br/>
                            <strong>Email:</strong> under@gmail.com1<br/>
                            <strong>SĐT:</strong> 01234567891
                        </div>
                </Col>

                <Col md={6} className="p-t-30"></Col>
                <Col md={6} className="p-t-30">
                    <h4 className="s-text12 p-b-30">
                        FACEBOOK
                    </h4>
                    <div className="fb-page fb_iframe_widget" data-href="http://facebook.com1" data-width="270" data-height="300" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                            <span style={{verticalAlign: 'bottom', width: 270+'px', height: 230+'px'}}>
                                <iframe
                                    className=""
                                    style={{border: 'none', visibility: 'visible', width: 270+'px', height: 230+'px'}}
                                    title="fb:page Facebook Social Plugin"
                                    src="https://www.facebook.com/v4.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D45%23cb%3Df14ed1a0bbe6c5%26domain%3Dunder.vn%26origin%3Dhttps%253A%252F%252Funder.vn%252Ff2ec0366538dcd8%26relation%3Dparent.parent&amp;container_width=514&amp;height=300&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FUNDERStreetwear.Official&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;width=270"
                                    name="f1d0e4b117f83a4"
                                    width="270px"
                                    height="300px"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowFullScreen="allowfullscreen">
                                </iframe>
                            </span>
                    </div>
                </Col>
            </Row>

            <div className="t-center s-text8 p-t-20">
                Copyright © 2019-2020 By UNDER Vietnam. All rights reserved.
            </div>
        </footer>
    )
}

export default FooterLogin;

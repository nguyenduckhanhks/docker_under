import React from 'react';
import { Drawer, Row, Col, Empty } from 'antd';

const USER_SHOP = 3;
const USER_CTV = 4;

const DescriptionItem = ({ title, content, des }) => (
    <div className="site-description-item-profile-wrapper">
        <h5 className="site-description-item-profile-p-label">{title}</h5>
        {content} {des}
    </div>
);

const RenderShop = ({shopData, tel, email}) => {
    return shopData && (
        <div>
            <h2 className="site-description-item-profile-p">Thông tin chung:</h2>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Mã cửa hàng:" content={shopData['shop_alias']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Số điện thoại:" content={tel} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Email:" content={email} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Địa chỉ:" content={shopData['address']} />
                </Col>
            </Row>

            <h2 className="site-description-item-profile-p">Chỉ số:</h2>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Phần trăm giá sản phẩm trả cho hệ thống:" content={shopData['price_service_percent']} des="VNĐ (Trên một sản phẩm)"/>
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Chi phí lớn nhất trả cho hệ thống:" content={shopData['price_service_max']} des="VNĐ (Trên một sản phẩm)"/>
                </Col>
            </Row>

            <h2 className="site-description-item-profile-p">Thông tin tài khoản ngân hàng:</h2>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Ví tiền:" content={shopData['amount']} des="VNĐ"/>
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Số tài khoản:" content={shopData['banking_account_number']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Chủ tài khoản:" content={shopData['banking_account_name']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Tên ngân hàng:" content={shopData['banking_name']} />
                </Col>
            </Row>
        </div>
    )
}

const RenderCTV = ({ctvData, tel, email}) => {
    return ctvData && (
        <div>
            <h2 className="site-description-item-profile-p">Thông tin chung:</h2>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Tên thương hiệu:" content={ctvData['trademark']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Số điện thoại:" content={tel} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Email:" content={email} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Địa chỉ:" content={ctvData['address']} />
                </Col>
            </Row>

            <h2 className="site-description-item-profile-p">Thông tin tài khoản ngân hàng:</h2>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Ví tiền:" content={ctvData['amount']} des="VNĐ"/>
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Số tài khoản:" content={ctvData['banking_account_number']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Chủ tài khoản:" content={ctvData['banking_account_name']} />
                </Col>
                <Col span={24}>
                    <DescriptionItem title="Tên ngân hàng:" content={ctvData['banking_name']} />
                </Col>
            </Row>
        </div>
    )
}

const ModalDetailUser = (props) => {
    let {userDetailData} = props

    return (
        <Drawer
            width={'500px'}
            placement="right"
            closable={false}
            visible={props.visible}
            onClose={() => props.setVisible(false)}
        >
            <h1 className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                {userDetailData.name ?? 'Không tìm thấy dữ liệu người dùng!'}
            </h1>
            {
                userDetailData.type == USER_SHOP ?
                <RenderShop
                    shopData={userDetailData['shop']}
                    tel={userDetailData['tel']}
                    email={userDetailData['email']}
                />: (
                    userDetailData.type == USER_CTV &&
                    <RenderCTV
                        ctvData={userDetailData['ctv']}
                        tel={userDetailData['tel']}
                        email={userDetailData['email']}
                    />
                )
            }
        </Drawer>
    )
}

export default ModalDetailUser

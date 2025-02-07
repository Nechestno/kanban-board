import React from 'react';
import HeaderComponent from '../Header/Header.tsx';
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";

const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 80px)',
    backgroundColor: '#202D48',
};



const SiteLayout: React.FC = () => {
    return (
        <Layout>
            <div style={{backgroundColor:'#202D48' }}>
            <HeaderComponent/>
            </div>
            <Content style={contentStyle}>
                <Outlet/>
            </Content>
        </Layout>
    );
}

export default SiteLayout;

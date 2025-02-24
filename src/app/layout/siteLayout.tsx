import React from 'react';
import { Layout } from 'antd';
import { Header } from '../../widgets/header';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
  height: 'calc(100vh - 100px)',
  backgroundColor: '#202D48',
};


export const SiteLayout: React.FC = () => {
  return (
    <Layout>
      <div style={{ backgroundColor: '#202D48' }}>
        <Header />
      </div>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
};

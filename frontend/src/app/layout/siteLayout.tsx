import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

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

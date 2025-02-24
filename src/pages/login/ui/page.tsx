import React from 'react';
import './page.scss';
import { LoginForm } from '@/features/auth/login';
import { CustomButton } from '@/shared/ui/customButton';
import { Form } from 'antd';
import { Link } from 'react-router-dom';


export const LoginPage: React.FC = () => {

  return (
    <div className="login-page">
      <div className="login-page__form">
        <LoginForm />
        <Form.Item style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Link to="/registration">
            <CustomButton
              type="link"
              style={{ fontSize: '14px' }}
              block
            >
              Перейти к регистрации
            </CustomButton>
          </Link>
        </Form.Item>
      </div>
    </div>
  );
};


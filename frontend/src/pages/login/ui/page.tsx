import { Button, Form } from 'antd';
import React from 'react';
import './page.scss';
import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/login';


export const LoginPage: React.FC = () => {

  return (
    <div className="login-page">
      <div className="login-page__form">
        <LoginForm />
        <Form.Item className="login-page__form-item ">
          <Link to="/registration">
            <Button
              type="link"
              className="login-page__link"
              block
            >
              Перейти к регистрации
            </Button>
          </Link>
        </Form.Item>
      </div>
    </div>
  );
};


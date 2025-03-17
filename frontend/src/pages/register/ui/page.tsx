import { Button, Form } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '@/features/auth/register';
import './page.scss';

export const RegisterPage: React.FC = () => {

  return (
    <div className="registration-page">
      <div className="registration-page__form">
        <RegisterForm />
        <Form.Item className="registration-page__form-item" >
          <Link to="/login">
            <Button
              type="link"
              className="login-page__link"
              block
            >
              Уже есть аккаунт? Войти
            </Button>
          </Link>
        </Form.Item>
      </div>
    </div>
  );
};


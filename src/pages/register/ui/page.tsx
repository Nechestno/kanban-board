import React from 'react';
import { Form } from 'antd';
import { RegisterForm } from '@/features/auth/register';
import { CustomButton } from '@/shared/ui/custom-button';
import { Link } from 'react-router-dom';
import './page.scss';

export const RegisterPage: React.FC = () => {

  return (
    <div className="registration-page">
      <div className="registration-page__form">
        <RegisterForm />
        <Form.Item style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Link to="/login">
            <CustomButton
              type="link"
              style={{ fontSize: '14px' }}
              block
            >
              Уже есть аккаунт? Войти
            </CustomButton>
          </Link>
        </Form.Item>
      </div>
    </div>
  );
};


import { Button, Divider, Form, message, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useLoginMutation } from '@/entities/user';
import { selectUser } from '@/entities/user';
import { IUserData } from '@/shared/api';
import { isErrorWithMessage, useAppSelector } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import './form.scss'


export const LoginForm: React.FC = () => {

  const { Title } = Typography;
  const [login] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);


  const handleLogin = async (data: Omit<IUserData,'name'>) => {
    try {
      await login(data).unwrap();
      messageApi.open({
        type: 'success',
        content: 'Вы успешно вошли',
      });
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        messageApi.open({
          type: 'error',
          content: err.data.message || 'Произошла ошибка при авторизации',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'Неизвестная ошибка',
        });
      }
    }
  };

  const onFinishFailed = () => {
    messageApi.open({
      type: 'error',
      content: 'Пожалуйста, заполните все обязательные поля!',
    });
  };


  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='login-form'
      >
        <div className='login-form__header'>
          <Title level={2} className='login-form__title' style={{fontWeight:700}}>Авторизация</Title>
          <Divider className='login-form__divider' />
        </div>

        <CustomFormInput
          label="Логин:"
          name="login"
          placeholder="Введите логин"
          rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
          className='login-form__input'
        />

        <CustomFormInput
          label="Пароль:"
          name="password"
          type="password"
          placeholder="Введите пароль"
          rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
          className="login-form__input"
        />

        <Form.Item className='login-form__item'>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="login-form__button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
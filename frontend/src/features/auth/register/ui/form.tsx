import { Button, Divider, Form, message, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUser, useRegisterMutation } from '@/entities/user';
import { IUserData } from '@/shared/api';
import { isErrorWithMessage, useAppSelector } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import './form.scss'

export const RegisterForm: React.FC = () => {
  const { Title } = Typography;
  const [register] = useRegisterMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();


  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  const handleRegister = async (data: IUserData) => {
    try {
      await register(data).unwrap();
      messageApi.open({
        type: 'success',
        content: 'Вы успешно зарегистрировались',
      });
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        messageApi.open({
          type: 'error',
          content: err.data.message || 'Произошла ошибка при регистрации',
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
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='register-form'
      >
        <div style={{ textAlign: 'center' }}>
          <Title level={2} className='register-form__title' style={{ fontWeight: 700}}>Регистрация</Title>
          <Divider className='register-form__divider' />
        </div>

        <CustomFormInput
          label="Никнейм:"
          name="name"
          placeholder="Введите никнейм"
          rules={[{ required: true, message: 'Пожалуйста введите никнейм!' }]}
          className='register-form__input'
        />

        <CustomFormInput
          label="Логин:"
          name="login"
          placeholder="Введите логин"
          className='register-form__input'
          rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
        />

        <CustomFormInput
          label="Пароль:"
          name="password"
          type="password"
          placeholder="Введите пароль"
          className='register-form__input'
          rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
        />
        <Form.Item className='register-form__item'>
          <Button
            type="primary"
            htmlType="submit"
            block
            className='register-form__button'
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


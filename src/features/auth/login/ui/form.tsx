import React, { useEffect } from 'react';
import { Divider, Form, message, Typography } from 'antd';
import { CustomInput } from '@/shared/ui/custom-input';
import { CustomButton } from '@/shared/ui/custom-button';
import { ILoginData, useLoginMutation } from '@/entities/user';
import { redirect, useNavigate } from 'react-router-dom';
import { selectUser } from '@/entities/user/model';
import { isErrorWithMessage, useAppSelector } from '@/shared/lib';


export const LoginForm: React.FC = () => {

  const { Title } = Typography;
  const [login] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/main');
    } else {
      redirect('/login');
    }
  }, [user, navigate]);


  const handleLogin = async (data: ILoginData) => {
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
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ fontWeight: 700, margin: '15px 0px' }}>Авторизация</Title>
          <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
        </div>

        <CustomInput
          label="Логин:"
          name="login"
          placeholder="Введите логин"
          rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
          style={{ width: '75%', margin: '0 auto' }}
          labelStyle={{ fontSize: '16px', fontWeight: '600' }}
        />

        <CustomInput
          label="Пароль:"
          name="password"
          type="password"
          placeholder="Введите пароль"
          rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
          style={{ width: '75%', margin: '0 auto' }}
          labelStyle={{ fontSize: '16px', fontWeight: '600' }}
        />

        <Form.Item style={{ margin: '70px 0px 5px 0px', width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
          <CustomButton
            type="primary"
            htmlType="submit"
            style={{ fontSize: '16px', height: '40px', lineHeight: '40px' }}
            block
          >
            Войти
          </CustomButton>
        </Form.Item>
      </Form>
    </>
  );
};
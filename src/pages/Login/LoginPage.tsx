import React from 'react';
import {Button, Divider, Flex, Form, FormProps, Input} from "antd";
import './LoginPage.scss'
import { Typography } from 'antd';

type FieldType = {
    login?: string;
    password?: string;
};

export const LoginPage : React.FC = () => {
    const {Title} = Typography;

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
                <div className='login-page__form'>
                <Form
                    layout="vertical"
                    style={{width:'100%'}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Flex vertical justify="center" align="center">
                        <Title level={2} className='login-page__title' style={{fontWeight:700 , margin: '15px 0px'}}>Авторизация</Title>
                        <Divider style={{ borderColor: '#82A7A6', margin:'0px 0px 24px 0', marginBottom: '24px' }}  />
                            <Form.Item<FieldType>
                                label="Логин:"
                                name="login"
                                style={{ width: '75%',fontSize: '16px', fontWeight: '600', padding: '0px' }}
                                labelCol={{ style: { padding: 0, fontSize: '20px' } }}
                                rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                                >
                                <Input placeholder="Введите логин" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 25%)', minHeight:'33px', fontSize: '16px'}}/>
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Пароль:"
                                name="password"
                                style={{ width: '75%', fontSize: '16px', fontWeight: '600' }}
                                labelCol={{ style: { padding: 0, fontSize: '20px' } }}
                                rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                            >
                                <Input.Password placeholder="Введите пароль" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 25%)', minHeight:'33px', fontSize: '16px'}}/>
                            </Form.Item>

                        <Form.Item label={null} style={{margin: '70px 0px 5px 0px', width: '75%', minHeight:'33px'}} >
                            <Button type="primary" htmlType="submit" style={{fontSize:"16px",height:'40px',lineHeight: '40px'}} block>
                                Войти
                            </Button>
                        </Form.Item>
                        <Form.Item label={null} style={{width: '75%'}} >
                            <Button type="link" style={{fontSize:'14px'}}  block>
                                Регистрация
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
                </div>
        </div>
    );
}


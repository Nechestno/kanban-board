import React from 'react';
import {Divider, Form, Typography} from "antd";
import {LoginInput} from "../LoginInput/LoginInput.tsx";
import {IRegisterData} from "../../types/user.types.ts";
import {CustomButton} from "../CustomButton/CustomButton.tsx";


type PropsType = {
    onFinish?: (values: IRegisterData) => void;
    onFinishFailed?: () => void;
}

export const RegisterForm: React.FC<PropsType> = ({ onFinish, onFinishFailed }) => {
    const { Title } = Typography;

    return (
        <Form
            layout="vertical"
            style={{ width: '100%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{ textAlign: 'center' }}>
                <Title level={2} style={{ fontWeight: 700, margin: '15px 0px' }}>Регистрация</Title>
                <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
            </div>

            <LoginInput
                label="Никнейм:"
                name="nickname"
                placeholder="Введите никнейм"
                rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                style={{ width: '75%', margin: '0 auto' }}
                labelStyle={{ fontSize: '16px', fontWeight: '600' }}
            />

            <LoginInput
                label="Логин:"
                name="login"
                placeholder="Введите логин"
                rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                style={{ width: '75%', margin: '0 auto' }}
                labelStyle={{ fontSize: '16px', fontWeight: '600' }}
            />

            <LoginInput
                label="Пароль:"
                name="password"
                type="password"
                placeholder="Введите пароль"
                rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                style={{ width: '75%', margin: '0 auto' }}
                labelStyle={{ fontSize: '16px', fontWeight: '600'}}
            />
            <Form.Item style={{ margin: '70px 0px 5px 0px', width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                <CustomButton
                    type="primary"
                    htmlType="submit"
                    style={{ fontSize: "16px", height: '40px', lineHeight: '40px' }}
                    block
                >
                    Зарегистрироваться
                </CustomButton>
            </Form.Item>

        </Form>
    )
};


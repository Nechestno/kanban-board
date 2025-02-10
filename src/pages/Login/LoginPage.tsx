import React, {useState} from 'react';
import './LoginPage.scss'
import { LoginForm } from "../../components/LoginForm/LoginForm.tsx";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm.tsx"
import {CustomButton} from "../../components/CustomButton/CustomButton.tsx";
import {Form} from "antd";



export const LoginPage : React.FC = () => {
    const [selectedForm, setSelectedForm] = useState<"login" | "register">("login");

    const switchToLogin = () => {
        setSelectedForm("login"); // Переключаемся на форму авторизации
    };

    const switchToRegister = () => {
        setSelectedForm("register"); // Переключаемся на форму регистрации
    };

    const login = () => {
        console.log('login');

    }

    const register = () => {
        console.log('register');
    }


    return (
        <div className="login-page">
                <div className='login-page__form'>
                    {selectedForm === "login" ? (
                        <LoginForm onFinish={login} />
                    ): (
                        <RegisterForm onFinish={register} />
                    )}
                    {selectedForm === "login" ? (
                        <Form.Item style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <CustomButton
                                type="link"
                                style={{ fontSize: '14px' }}
                                block
                                onClick={() => switchToRegister()}
                            >
                                Перейти к регистрации
                            </CustomButton>
                        </Form.Item>
                    ) : (
                        <Form.Item style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <CustomButton
                                type="link"
                                style={{ fontSize: '14px' }}
                                block
                                onClick={() => switchToLogin()}
                            >
                                Уже есть аккаунт? Войти
                            </CustomButton>
                        </Form.Item>
                    )}
                </div>
        </div>
    );
}


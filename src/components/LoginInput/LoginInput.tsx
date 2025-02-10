import React from 'react';
import { Form, Input } from 'antd';

type LoginInputProps = {
    label: string;
    name: string;
    type?: 'text' | 'password';
    rules?: object[];
    style?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    placeholder?: string;
};

export const LoginInput: React.FC<LoginInputProps> =
    ({
      label,
      name,
      type = 'text',
      rules = [],
      style,
      labelStyle,
      placeholder,
      }) => {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
            style={style}
            labelCol={{ style: labelStyle }}
        >
            {type === 'password' ? (
                <Input.Password placeholder={placeholder} />
            ) : (
                <Input placeholder={placeholder} />
            )}
        </Form.Item>
    );
};

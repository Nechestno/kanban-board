import React from 'react';
import { Form, Input } from 'antd';
import { CustomInputProps } from './types.ts';


export const CustomInput: React.FC<CustomInputProps> =
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

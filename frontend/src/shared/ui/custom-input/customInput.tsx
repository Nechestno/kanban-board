import { Form, Input } from 'antd';
import { InputProps } from 'antd/es/input/Input';
import React from 'react';

export interface CustomProps extends InputProps {
  label?: string;
  name?: string;
  type?: 'text' | 'password';
  rules?: object[];
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  className?: string;
}


export const CustomFormInput: React.FC<CustomProps> =
  ({
      label,
      type = 'text',
      name,
      rules = [],
      labelStyle,
      style,
      className,
      ...inputProps
   }) => {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        style={style}
        labelCol={{ style: labelStyle }}
        className={className}
      >
        {type === 'password' ? (
          <Input.Password {...inputProps} />
        ) : (
          <Input {...inputProps} />
        )}
      </Form.Item>
    );
  };

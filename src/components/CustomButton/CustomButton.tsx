import React from 'react';
import { Button } from 'antd';

type CustomButtonProps = {
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
    htmlType?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
    block?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export const CustomButton: React.FC<CustomButtonProps> =
    ({
          type = 'default',
          htmlType = 'button',
          style,
          block = false,
          onClick,
          children,
      }) => {
    return (
        <Button type={type} htmlType={htmlType} style={style} block={block} onClick={onClick}>
            {children}
        </Button>
    );
};
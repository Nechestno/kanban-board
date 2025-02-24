import React from 'react';
import { Button } from 'antd';
import { CustomButtonProps } from './types.ts';


export const CustomButton: React.FC<CustomButtonProps> =
  ({
     type = 'default',
     htmlType = 'button',
     style,
     block = false,
     onClick,
     children,
     icon,
     onSubmit,
   }) => {
    return (
      <Button type={type} htmlType={htmlType} style={style} block={block} onClick={onClick} icon={icon}
              onSubmit={onSubmit}>
        {children}
      </Button>
    );
  };
import React from 'react';

export interface CustomButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link',
  htmlType?: 'button' | 'submit' | 'reset',
  style?: React.CSSProperties,
  block?: boolean,
  onClick?: () => void,
  children?: React.ReactNode,
  icon?: React.ReactNode,
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
}
import React from 'react';

export interface CustomButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link',
  htmlType?: 'button' | 'submit' | 'reset',
  color?: 'primary' | 'default' | 'danger',
  style?: React.CSSProperties,
  block?: boolean,
  onClick?: () => void,
  children?: React.ReactNode,
  icon?: React.ReactNode,
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
}
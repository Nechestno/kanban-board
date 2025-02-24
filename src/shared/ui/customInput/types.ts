import React from 'react';

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  type?: 'text' | 'password';
  rules?: object[];
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  placeholder?: string;
}
import React from 'react';

export type CustomModalProps<T> = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: T) => Promise<void>;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  className?: string;
};

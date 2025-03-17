import { Modal } from 'antd';
import { useCallback, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModal = () => {

  const showSuccess = (message: string) => {
    Modal.success({
      content: message,
      centered: true,
    });
  };

  const showError = (message: string) => {
    Modal.error({
      content: message,
      centered: true,
    });
  };

  const showInfo = (message: string) => {
    Modal.info({
      content: message,
      centered: true,
    });
  };

  return { showSuccess, showError, showInfo };
};

export const useConfirm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const showConfirm = useCallback((title:string, message: string, onConfirm: () => void) => {
    Modal.confirm({
      title: title,
      centered: true,
      content: message,
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk() {
        setIsConfirmed(true);
        onConfirm();
      },
      onCancel() {
        setIsConfirmed(false);
      },
    });
  }, []);

  return { showConfirm, isConfirmed };
};
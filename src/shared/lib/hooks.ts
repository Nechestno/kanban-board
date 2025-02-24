import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

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
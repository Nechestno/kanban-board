import { CustomButton } from '@/shared/ui/customButton';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { isErrorWithMessage, useModal } from '@/shared/lib';
import { IBoardData, useDeleteBoardMutation } from '@/entities/board';
import { Spin } from 'antd';

export const DeleteBoardButton: React.FC<Omit<IBoardData, 'name'>> = ({ id }) => {
  const { showSuccess, showError } = useModal();
  const [deleteBoard, { isLoading }] = useDeleteBoardMutation();


  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(id).unwrap();
      showSuccess('Элемент успешно удалён');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  if (isLoading) {
    return (<Spin indicator={<LoadingOutlined spin />} size="large" />);
  }

  return (
    <CustomButton type="primary" color="danger" icon={<DeleteOutlined />} style={{ marginLeft: '10px' }}
                  onClick={handleDeleteBoard} />
  );
};
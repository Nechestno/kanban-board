import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { isErrorWithMessage, useConfirm, useModal } from '@/shared/lib';
import { IBoardData, useDeleteBoardMutation } from '@/entities/board';
import { Button } from 'antd';

export const DeleteBoardButton: React.FC<Omit<IBoardData, 'name'>> = ({ id }) => {
  const { showSuccess, showError } = useModal();
  const [deleteBoard] = useDeleteBoardMutation();
  const { showConfirm } = useConfirm();


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

  const handleClick = () => {
    showConfirm('Подтверждение удаления доски', 'Вы точно хотите удалить доску', handleDeleteBoard);
  }

  return (
    <Button type="primary" danger icon={<DeleteOutlined />} style={{ marginLeft: '10px' }} onClick={handleClick} />
  );
};
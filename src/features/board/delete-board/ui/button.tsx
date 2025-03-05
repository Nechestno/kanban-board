import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { isErrorWithMessage, useAppDispatch, useAppSelector, useConfirm, useModal } from '@/shared/lib';
import { selectPreviousBoardId, setSelectedBoardId, useDeleteBoardMutation } from '@/entities/board';
import { Button } from 'antd';

interface DeleteBoardButtonProps {
  id: string;
}


export const DeleteBoardButton: React.FC<DeleteBoardButtonProps>= ({ id }) => {
  const { showSuccess, showError } = useModal();
  const [deleteBoard] = useDeleteBoardMutation();
  const { showConfirm } = useConfirm();
  const dispatch = useAppDispatch();
  const previousBoardId = useAppSelector(selectPreviousBoardId);


  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(id).unwrap();
      showSuccess('Элемент успешно удалён');
      dispatch(setSelectedBoardId(previousBoardId)); // Вызываем функцию для обновления выбранной доски
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
  };

  return (
    <Button type="primary" danger icon={<DeleteOutlined />} style={{ marginLeft: '10px' }} onClick={handleClick} />
  );
};
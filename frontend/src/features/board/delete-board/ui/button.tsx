import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { selectPreviousBoardId, setSelectedBoardId, useDeleteBoardMutation } from '@/entities/board';
import { isErrorWithMessage, useAppDispatch, useAppSelector, useConfirm, useModal } from '@/shared/lib';

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
      dispatch(setSelectedBoardId(previousBoardId));
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
    <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleClick} />
  );
};
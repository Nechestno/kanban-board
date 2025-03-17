import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { useDeleteCategoryMutation } from '@/entities/category';
import { isErrorWithMessage, useConfirm, useModal } from '@/shared/lib';

interface IDeleteCategoryButtonProps {
  id : string;
}

export const DeleteCategoryButton : React.FC<IDeleteCategoryButtonProps> = ({ id }  ) => {
  const { showSuccess, showError } = useModal();
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const { showConfirm } = useConfirm();


  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(id).unwrap();
      showSuccess('Категория успешно удалёна');
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
    showConfirm('Подтверждение удаления категории', 'Вы точно хотите удалить категорию', handleDeleteCategory);
  }

  if (isLoading) {
    return (<Spin indicator={<LoadingOutlined spin />} size="large" />);
  }

  return (
    <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleClick} />
  );
};
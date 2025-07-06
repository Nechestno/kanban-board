import {  LoadingOutlined } from '@ant-design/icons';
import {  Spin } from 'antd';
import React from 'react';
import {  useUpdateCategoryMutation } from '@/entities/category';
import { ICategoryData } from '@/shared/api'
import { isErrorWithMessage, useModal } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import { CustomModal } from '@/shared/ui/custom-modal';

interface IUpdateCategoryModalProps {
  id : string
  onClose : () => void;
  isModalOpen: boolean;
}

export const UpdateCategoryModal : React.FC<IUpdateCategoryModalProps> = ({id, onClose, isModalOpen}) => {
  const { showSuccess, showError } = useModal();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();


  const handleUpdateCategory = async (data : Omit<ICategoryData, 'id'> ) => {
    try {
      await updateCategory({ id ,...data }).unwrap();
      showSuccess('Категория успешно обновлена');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  }


  if (isLoading) {
    return (<Spin indicator={<LoadingOutlined spin />} size="large" />);
  }

  return (
    <>
      <CustomModal<ICategoryData>
        title="Обновить категорию"
        isOpen={isModalOpen}
        onClose={onClose}
        onSubmit={handleUpdateCategory}
        cancelText="Отмена"
        okText="Изменить"
      >
        <CustomFormInput
          name="name"
          type="text"
          placeholder="Введите новое название категории"
        />
        {isLoading && <Spin />}
      </CustomModal>
    </>
);
};
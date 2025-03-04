import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { isErrorWithMessage, useModal } from '@/shared/lib';
import { Button, Spin } from 'antd';
import { ICategoryData, useUpdateCategoryMutation } from '@/entities/category';
import React, { useState } from 'react';
import { CustomModal } from '@/shared/ui/custom-modal';
import { CustomInput } from '@/shared/ui/custom-input';

interface IUpdateCategoryModalProps {
  id : string;
}

export const UpdateCategoryModal : React.FC<IUpdateCategoryModalProps> = ({id}) => {
  const { showSuccess, showError } = useModal();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateCategory = async (data : Omit<ICategoryData, 'id'> ) => {
    try {
      await updateCategory({ id ,...data }).unwrap();
      showSuccess('Категория успешно обновлена');
      setIsModalOpen(false);
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
      <Button type="primary" icon={<EditOutlined />} style={{marginLeft: '10px', width:'15%'}} onClick={showModal} />
      <CustomModal<ICategoryData>
        title="Обновить категорию"
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleUpdateCategory}
        cancelText="Отмена"
        okText="Изменить"
      >
        <CustomInput
          name="name"
          type="text"
          placeholder="Введите новое название категории"
        />
        {isLoading && <Spin />}
      </CustomModal>
    </>
);
};
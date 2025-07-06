import { EditOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useUpdateBoardMutation } from '@/entities/board';
import { IBoardData } from '@/shared/api';
import { isErrorWithMessage } from '@/shared/lib';
import { useModal } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import { CustomModal } from '@/shared/ui/custom-modal';

type BoardModalProps = {
  id: string;
  className?: string;
};

export const UpdateBoardModalButton: React.FC<BoardModalProps> = ({ id, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBoard, { isLoading }] = useUpdateBoardMutation(); // Добавляем isLoading
  const { showSuccess, showError } = useModal();

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleFormSubmit = async ({ name }: IBoardData) => {

    try {
      await updateBoard({ id, name }).unwrap();
      showSuccess('Доска успешно обновлена');
      setIsModalOpen(false);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<EditOutlined />} className={className} onClick={showModal} />
      <CustomModal<IBoardData>
        title="Обновить доску"
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleFormSubmit}
        cancelText="Отмена"
        okText="Изменить"
      >
        <CustomFormInput
          name="name"
          type="text"
          placeholder="Введите новое название доски"
        />
        {isLoading && <Spin />}
      </CustomModal>
    </>
  );
};
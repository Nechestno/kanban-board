import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useCreateBoardMutation } from '@/entities/board';
import { IBoardData } from '@/entities/board';
import { isErrorWithMessage } from '@/shared/lib';
import { useModal } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import { CustomModal } from '@/shared/ui/custom-modal';

type BoardModalProps = {
  className?: string;
};

export const CreateBoardModalButton: React.FC<BoardModalProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const { showSuccess, showError } = useModal();


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async ({ id, name }: IBoardData) => {
    try {
      await createBoard({ id, name }).unwrap();
      if (!isLoading) {
        setIsModalOpen(false);
      }
      showSuccess('Доска успешно создана');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
        setIsModalOpen(true);
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
      <Button type="primary"  className={className} onClick={showModal} ><PlusOutlined /></Button>
      <CustomModal<IBoardData>
        title="Создать доску"
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleFormSubmit}
        cancelText="Отмена"
        okText="Добавить">
        <CustomFormInput name="name" type="text" placeholder="Введите название доски" />
      </CustomModal>
    </>
  );
};

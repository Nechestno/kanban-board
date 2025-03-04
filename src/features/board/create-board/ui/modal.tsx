import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomInput } from '@/shared/ui/custom-input';
import { useCreateBoardMutation } from '@/entities/board';
import { IBoardData } from '@/entities/board';
import { isErrorWithMessage } from '@/shared/lib';
import { useModal } from '@/shared/lib';
import { CustomModal } from '@/shared/ui/custom-modal';

type BoardModalProps = {
  style?: React.CSSProperties;
};

export const AddBoardModal: React.FC<BoardModalProps> = ({ style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const { showSuccess, showError } = useModal();


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: IBoardData) => {
    try {
      await createBoard(data).unwrap();
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
      <Button type="primary" icon={<PlusOutlined />} style={style} onClick={showModal} />
      <CustomModal<IBoardData>
        title="Создать доску"
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleFormSubmit}
        cancelText="Отмена"
        okText="Добавить">
        <CustomInput name="name" type="text" placeholder="Введите название доски" />
      </CustomModal>
    </>
  );
};

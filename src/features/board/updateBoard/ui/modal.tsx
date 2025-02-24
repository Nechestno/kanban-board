import React, { useState } from 'react';
import { Button, Spin } from 'antd'; // Импорт Spin для индикатора загрузки
import { EditOutlined } from '@ant-design/icons';
import { CustomInput } from '@/shared/ui/customInput';
import { useUpdateBoardMutation } from '@/entities/board';
import { IBoardData } from '@/entities/board';
import { isErrorWithMessage } from '@/shared/lib';
import { useModal } from '@/shared/lib';
import { CustomModal } from '@/shared/ui/customModal';

type BoardModalProps = {
  style?: React.CSSProperties;
  id: string;
};

export const UpdateBoardModal: React.FC<BoardModalProps> = ({ style, id }) => {
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
      <Button type="primary" icon={<EditOutlined />} style={style} onClick={showModal} />
      <CustomModal<IBoardData>
        title="Обновить доску"
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleFormSubmit}
        cancelText="Отмена"
        okText="Изменить"
      >
        <CustomInput
          name="name"
          type="text"
          placeholder="Введите новое название доски"
        />
        {isLoading && <Spin />}
      </CustomModal>
    </>
  );
};
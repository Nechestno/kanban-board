import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { TaskDrawer } from '@/widgets/task-drawer';
import { useCreateTaskMutation } from '@/entities/task';
import { ITaskCardData } from '@/shared/api';
import { isErrorWithMessage, useModal } from '@/shared/lib';

interface ICreateTaskProps {
  id: string;
  name: string;
}

export const CreateTaskButton: React.FC<ICreateTaskProps> = ({ id, name }) => {
  const [open, setOpen] = useState(false);
  const [createTask] = useCreateTaskMutation();
  const { showSuccess, showError } = useModal();

  const handleFormSubmit = async (data: Omit<ITaskCardData, 'categoryId'>) => {
    try {
      await createTask({ categoryId: id, ...data }).unwrap();
      setOpen(false);
      showSuccess('Задание успешно добавлено');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} block onClick={showDrawer}>
        Добавить задание
      </Button>
      <TaskDrawer
        title={`Добавить задание в "${name}"`}
        onSubmit={handleFormSubmit}
        type="create"
        open={open}
        onClose={onClose}
      />
    </>
  );
};
import { ContainerOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { TaskDrawer } from '@/widgets/task-drawer';
import { ITaskCardData, useUpdateTaskMutation } from '@/entities/task';
import { isErrorWithMessage, useModal } from '@/shared/lib';

interface UpdateTaskButtonProps {
  task: ITaskCardData;
}

export const UpdateTaskButton: React.FC<UpdateTaskButtonProps> = ({ task }) => {
  const [updateTask] = useUpdateTaskMutation();
  const { showSuccess, showError } = useModal();
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleFormSubmit = async (data: Omit<ITaskCardData, 'id'>) => {
    try {
      await updateTask({ id: task.id, ...data }).unwrap();
      showSuccess('Задание успешно обновлено');
      setOpen(false);
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
  const handleSwitch =() => {
    if (isEditable) {
      setIsEditable(false);
    }
    else {
      setIsEditable(true);
    }
  }

  const onClose = () => {
    setOpen(false);
    setIsEditable(false); // Сбрасываем состояние редактируемости при закрытии
  };

  return (
    <>
      <ContainerOutlined onClick={showDrawer} />
      <TaskDrawer
        title={`Изменить задание "${task.title}"`}
        onSubmit={handleFormSubmit}
        initialValues={{
          title: task.title,
          type: task.type,
          description: task.description,
          dueDate: dayjs(task.dueDate),
        }}
        disabled={!isEditable}
        type="update"
        open={open}
        onClose={onClose}
        onSwitch={handleSwitch}
      />
    </>
  );
};
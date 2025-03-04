import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { isErrorWithMessage, useConfirm, useModal } from '@/shared/lib';
import { useDeleteTaskMutation } from '@/entities/task';


interface DeleteTaskButtonProps {
  taskId: string;
}

export const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {

  const { showSuccess, showError } = useModal();
  const [deleteTask] = useDeleteTaskMutation();
  const { showConfirm } = useConfirm();


  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId).unwrap();
      showSuccess('Задание успешно удалён');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  const handleClick =  () => {
    showConfirm('Подтверждение удаления задания','Вы точно хотите удалить данное задание', handleDeleteTask)
  }


  return <DeleteOutlined onClick={handleClick} />;
};
import React from 'react';
import { DroppableCategory } from '@/features/category/droppable-category';
import { ICategoryDataWithTasks } from '@/entities/category';
import { useUpdateTaskMutation } from '@/entities/task';
import './list.scss';
import { isErrorWithMessage, useModal } from '@/shared/lib';


interface CategoryListProps {
  children: React.ReactNode;
  category: ICategoryDataWithTasks;
}

export const CategoryList: React.FC<CategoryListProps>  = ({ children, category }) => {
  const [updateTask] = useUpdateTaskMutation();
  const { showError } = useModal();

  const handleTaskDrop = async ( taskId: string, newCategoryId:string ) => {
    try {
      updateTask({id: taskId,categoryId: newCategoryId}).unwrap();
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };


  return (
            <DroppableCategory
              key={category.id}
              category={category}
              onTaskDrop={handleTaskDrop}
            >
              {children}
            </DroppableCategory>
        );
};
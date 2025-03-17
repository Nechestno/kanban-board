import { Badge, Divider, Typography } from 'antd';
import React from 'react';
import { useDrop } from 'react-dnd';
import { DeleteCategoryButton } from '@/features/category/delete-category';
import { UpdateCategoryModal } from '@/features/category/update-category';
import './category.scss';
import { ICategoryDataWithTasks } from '@/entities/category';
import { ITaskCardData } from '@/entities/task';


interface IDroppableCategoryProps {
  category: ICategoryDataWithTasks;
  onTaskDrop: (taskId: string, newCategoryId: string) => void;
  children: React.ReactNode;
}

export const DroppableCategory: React.FC<IDroppableCategoryProps> = ({ category, onTaskDrop, children }) => {
  const { Title } = Typography;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: ITaskCardData) => onTaskDrop(item.id, category.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const badgeColor = category.tasks && category.tasks.length < 10 ? 'green' : 'red';

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#EEEEEE' : '#f5f5f5',
      }}
      className="droppable-category"
    >
      <div className="droppable-category__header">
        <Title level={4} className='droppable-category__header-title' style={{fontWeight: '700'}}>
          {category.name}
          <Badge
            count={category.tasks ? category.tasks.length : 0}
            showZero
            color={badgeColor}
            className='droppable-category__header-badge'
          />
        </Title>
        <div
          className="droppable-category__header-buttons"
        >
          <UpdateCategoryModal id={category.id} />
          <DeleteCategoryButton id={category.id} />
        </div>
      </div>
      <Divider className="droppable-category__divider" />
      {children}
    </div>
  );
};
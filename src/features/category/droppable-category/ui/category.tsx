import { useDrop } from 'react-dnd';
import { DraggableTaskCard } from '@/widgets/task-card';
import { Badge, Divider, Typography } from 'antd';
import { AddTask } from '@/features/task/create-task';
import { DeleteCategoryButton } from '@/features/category/delete-category';
import { UpdateCategoryModal } from '@/features/category/update-category';
import './category.scss';

import React from 'react';
import { ICategoryData } from '@/entities/category';
import { ITaskCardData } from '@/entities/task';

interface ICategoryDataWithTasks extends ICategoryData {
  tasks: ITaskCardData[] | null;
}

interface IDroppableCategoryProps {
  category: ICategoryDataWithTasks;
  onTaskDrop: (taskId: string, newCategoryId: string) => void;
}

export const DroppableCategory: React.FC<IDroppableCategoryProps> = ({ category, onTaskDrop }) => {
  const { Title } = Typography;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: ITaskCardData) => onTaskDrop(item.id, category.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#EEEEEE' : '#f5f5f5',
      }}
      className="category-list__container"
    >
      <div className="category-list__header">
        <Title level={4} style={{ margin: '10px', fontWeight: '700' }}>
          {category.name}
          <Badge
            count={category.tasks ? category.tasks.length : 0}
            showZero
            color="#52c41a"
            style={{ marginLeft: '5px' }}
          />
        </Title>
        <div
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <UpdateCategoryModal id={category.id} />
          <DeleteCategoryButton id={category.id} />
        </div>
      </div>
      <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
      <div className="category-list__tasks">
        {category.tasks?.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="category-list__footer">
        <AddTask id={category.id} name={category.name} />
      </div>
    </div>
  );
};
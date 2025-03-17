import React from 'react';
import { useDrag } from 'react-dnd';
import { TaskCard } from '@/widgets/task-card';
import { ITaskCardData } from '@/entities/task';


interface IDraggableTaskCardProps {
  task: ITaskCardData;
}

export const DraggableTaskCard: React.FC<IDraggableTaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'pointer',
      }}
    >
      <TaskCard {...task} />
    </div>
  );
};
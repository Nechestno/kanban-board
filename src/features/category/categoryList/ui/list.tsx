import React from 'react';
import { Badge, Divider, Typography } from 'antd';
import { useGetAllCategoriesWithTasksByBoardIdQuery } from '@/entities/category';
import { AddTask } from '@/features/task';
import { TaskCard } from '@/widgets/task-card';
import './list.scss'


interface CategoryListProps {
  boardId: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({boardId}) => {
  const { Title } = Typography;
  const { data: categories, error: categoryError } =
    useGetAllCategoriesWithTasksByBoardIdQuery(boardId);

  if (categoryError) {
    return <Title level={4}>Создайте раздел</Title>;
  }

  return (
    <div className="category-list">
      {categories?.map((category) => (
        <div key={category.id} className="category-list__container">
          <div className="category-list__header">
            <Title level={4} style={{ margin: '10px', fontWeight: '700' }}>
              <Badge
                key={category.id}
                color={category.tagColor}
                style={{ marginRight: '5px' }}
              />
              {category.name}
              <Badge
                count={category.tasks ? category.tasks.length : 0}
                showZero
                color="#52c41a"
                style={{ marginLeft: '5px' }}
              />
            </Title>
            <AddTask {...category} />
          </div>
          <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
          <div className="category-list__tasks">
            {category.tasks?.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


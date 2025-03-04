import React from 'react';
import { Badge, Divider, Typography, Spin } from 'antd';
import { useGetAllCategoriesWithTasksByBoardIdQuery } from '@/entities/category';
import { AddTask } from '@/features/task/create-task';
import { TaskCard } from '@/widgets/task-card';
import './list.scss';
import {  LoadingOutlined } from '@ant-design/icons';
import { DeleteCategoryButton } from '@/features/category/delete-category';
import { UpdateCategoryModal } from '@/features/category/update-category';

interface CategoryListProps {
  boardId: string;
}



export const CategoryList: React.FC<CategoryListProps> = ({ boardId }) => {
  const { Title } = Typography;
  const { data: categories, error: categoryError, isLoading } =
    useGetAllCategoriesWithTasksByBoardIdQuery(boardId);


  if (categoryError) {
    return <Title level={4}>Создайте раздел</Title>;
  }

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
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
              <div style={{width:'100%', justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}}>
                <UpdateCategoryModal id={category.id} />
                <DeleteCategoryButton id={category.id}/>
              </div>
            </div>
            <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
            <div className="category-list__tasks">
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                category.tasks?.map((task) => <TaskCard key={task.id} {...task} />)
              )}

            </div>
            <div className="category-list__footer">
              <AddTask {...category} />
            </div>
          </div>
        )
      )}
    </div>
  );
};
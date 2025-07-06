import { HomeOutlined, FolderOutlined, LoadingOutlined } from '@ant-design/icons';
import { Typography, Divider, Spin } from 'antd';
import React from 'react';
import './page.scss';
import withScrolling from 'react-dnd-scrolling';
import { BoardMenu } from '@/widgets/board-menu';
import { CategoryList } from '@/widgets/category-list';
import { DraggableTaskCard } from '@/widgets/task-card';
import { AddCategoryForm } from '@/features/category/create-category';
import { CreateTaskButton } from '@/features/task/create-task';
import { selectSelectedBoardId } from '@/entities/board';
import { useGetAllCategoriesWithTasksByBoardIdQuery } from '@/entities/category';
import { useAppSelector } from '@/shared/lib';

export const MainPage: React.FC = () => {
  const { Title } = Typography;
  const ScrollingComponent = withScrolling('div');
  const selectedBoardId = useAppSelector(selectSelectedBoardId);

  const { data: categories, isError, isLoading } =
    useGetAllCategoriesWithTasksByBoardIdQuery(selectedBoardId);

  return (
    <div className="main-page">
      <div className="main-page__container">
        <div className="main-page__nav">
          <Title level={4}>
            <HomeOutlined /> Главная
          </Title>
          <Title level={4}>
            <FolderOutlined /> Рабочее пространство
          </Title>
          <BoardMenu />
        </div>
        <div className="main-page__board">
          <AddCategoryForm/>
          <Divider className="main-page__divider"/>
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" /> :
            <>
              {isError ? <Title level={3}>Создайте первую категорию</Title> :
              <ScrollingComponent
                className="main-page__board-scroll"
              >
                <div className='category-list'>
                {categories && categories.map(category => (
                    <CategoryList key={category.id} category={category}>
                      <div className="category-list__tasks">
                        {category.tasks?.map((task) => (
                          <DraggableTaskCard key={task.id} task={task} />
                        ))}
                      </div>
                      <div className="category-list__footer-button">
                        <CreateTaskButton id={category.id} name={category.name} />
                      </div>
                    </CategoryList>
                ))}
                </div>
              </ScrollingComponent>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};
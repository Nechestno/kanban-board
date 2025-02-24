import React from 'react';
import './MainPage.scss';
import {
  Badge,
  Button,
  ColorPicker,
  Divider,
  Flex,
  Input,
  Typography,
} from 'antd';
import { FolderOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { TaskCard } from '../../widgets/task-card/ui/card.tsx';
import { useGetAllCategoriesWithTasksByBoardIdQuery } from '@/entities/category';

import { BoardMenu } from '@/features/board/boardMenu';
import { useAppSelector } from '@/shared/lib';
import { selectSelectedBoardId } from '@/entities/board/model';

export const MainPage: React.FC = () => {
  const { Title } = Typography;
  const selectedBoardId = useAppSelector(selectSelectedBoardId);
  const { data: categories, error: categoryError } =
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
          <Flex
            justify="start"
            align="center"
            style={{ height: '60px', marginLeft: '10px' }}
          >
            <Input
              placeholder="Введите название раздела"
              style={{ width: '300px', marginRight: '10px' }}
            />
            <ColorPicker defaultValue="#82A7A6"></ColorPicker>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginLeft: '10px' }}
            ></Button>
          </Flex>
          <Divider
            style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }}
          />
          <div className="main-page__category">
            {!categoryError
              ? categories?.map((category) => (
                <div key={category.id} className="board-section">
                  <div className="board-section__header">
                    <Title
                      level={4}
                      style={{ margin: '10px', fontWeight: '700' }}
                    >
                      <Badge
                        key={category.id}
                        color={category.tagColor}
                        style={{ marginRight: '5px' }}
                      />
                      {category.name}
                      <Badge
                        count={category.tasks ? category.tasks.length : 0} // Handle null case
                        showZero
                        color="#52c41a"
                        style={{ marginLeft: '5px' }}
                      />
                    </Title>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      style={{ width: '25%' }}
                    />
                  </div>
                  <Divider
                    style={{
                      borderColor: '#82A7A6',
                      margin: '0px 0px 24px 0',
                    }}
                  />
                  <div className="board-section__tasks">
                    {category.tasks &&
                      category.tasks.map(
                        (
                          task, // Check for null
                        ) => <TaskCard key={task.id} {...task} />,
                      )}
                  </div>
                </div>
              ))
              : JSON.stringify(categoryError.data.message)}
          </div>
        </div>
      </div>
    </div>
  );
};

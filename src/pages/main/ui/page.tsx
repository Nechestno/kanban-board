import React from 'react';
import './page.scss';
import { Typography, Divider } from 'antd';
import { HomeOutlined, FolderOutlined } from '@ant-design/icons';
import { BoardMenu } from '@/widgets/board-menu';
import { AddCategoryForm } from '@/features/category/create-category';
import { CategoryList } from '@/widgets/category-list';
import { useAppSelector } from '@/shared/lib';
import { selectSelectedBoardId } from '@/entities/board/model';

export const MainPage: React.FC = () => {
  const { Title } = Typography;
  const selectedBoardId = useAppSelector(selectSelectedBoardId);

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
          <AddCategoryForm id={selectedBoardId} />
          <Divider style={{ borderColor: '#82A7A6', margin: '0px 0px 24px 0' }} />
          <div className='main-page__board-scroll'>
          <CategoryList boardId={selectedBoardId} />
          </div>
        </div>
      </div>
    </div>
  );
};
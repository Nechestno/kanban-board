import { Flex, Input, Menu } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useEffect, useState } from 'react';
import { CreateBoardButton } from '@/features/board/create-board';
import { DeleteBoardButton } from '@/features/board/delete-board';
import { UpdateBoardModalButton } from '@/features/board/update-board';
import {  setPreviousBoardId, useGetAllUserBoardsQuery } from '@/entities/board';
import { selectSelectedBoardId, setSelectedBoardId } from '@/entities/board';
import { IBoardData } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import './menu.scss'

export const BoardMenu: React.FC = () => {
  const { Search } = Input;
  const { data: boards = [] } = useGetAllUserBoardsQuery();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoards, setFilteredBoards] = useState<IBoardData[]>(boards);

  const selectedBoardId = useAppSelector(selectSelectedBoardId);

  const handleMenuClick = (boardId: string) => {
    dispatch(setPreviousBoardId(selectedBoardId));
    dispatch(setSelectedBoardId(boardId));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const newFilteredBoards = boards.filter(board =>
        board.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredBoards(newFilteredBoards);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, boards]);

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchTerm(value);
  };


  return (
      <div className='board-menu'>
      <div className='board-menu__header'>
        <Search placeholder="Поиск" className='board-menu__header-search' onSearch={onSearch} onChange={(e) => setSearchTerm(e.target.value)} />
        <CreateBoardButton className='board-menu__header-button' />
      </div>
      <Menu mode="vertical">
        {filteredBoards &&
          filteredBoards.map((board) => (
            <Menu.Item
              key={board.id}
              onClick={() => handleMenuClick(board.id)}
              style={{
                backgroundColor: selectedBoardId === board.id ? '#e6f7ff' : 'transparent',
                transition: 'background-color 0.3s ease',
              }}
            >
              <Flex justify="space-between">
                {board.name}
                <div className='board-menu__body-buttons'>
                  <UpdateBoardModalButton id={board.id}/>
                  <DeleteBoardButton id={board.id}/>
                </div>
              </Flex>
            </Menu.Item>
          ))}
      </Menu>
      </div>
  );
};
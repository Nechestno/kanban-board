import React from 'react';
import { Flex, Input, Menu } from 'antd';
import { AddBoardModal } from '@/features/board/create-board';
import { SearchProps } from 'antd/es/input';
import { useGetAllUserBoardsQuery } from '@/entities/board';
import { DeleteBoardButton } from '@/features/board/delete-board';
import { UpdateBoardModal } from '@/features/board/update-board';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectSelectedBoardId, setSelectedBoardId } from '@/entities/board/model';

export const BoardMenu: React.FC = () => {
  const { Search } = Input;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const { data: boards } = useGetAllUserBoardsQuery();
  const dispatch = useAppDispatch();

  const selectedBoardId = useAppSelector(selectSelectedBoardId); // Убедитесь, что путь правильный


  const handleMenuClick = (boardId: string) => {
    dispatch(setSelectedBoardId(boardId));
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <Search placeholder="Поиск" onSearch={onSearch} />
        <AddBoardModal style={{ width: '25%', marginLeft: '10px' }} />
      </div>
      <Menu mode="vertical">
        {boards &&
          boards.map((board) => (
            <Menu.Item
              key={board.id}
              onClick={() => handleMenuClick(board.id)}
              style={{
                backgroundColor: selectedBoardId === board.id ? '#e6f7ff' : 'transparent', // Подсвечиваем выбранную доску
                transition: 'background-color 0.3s ease',
              }}
            >
              <Flex justify="space-between">
                {board.name}
                <div>
                  <UpdateBoardModal id={board.id} style={{ marginLeft: '10px' }} />
                  <DeleteBoardButton id={board.id} />
                </div>
              </Flex>
            </Menu.Item>
          ))}
      </Menu>
    </>
  );
};
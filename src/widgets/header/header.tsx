import './header.scss';
import { CarryOutOutlined, DownOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { logout, selectIsAuthenticated } from '@/entities/user';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Профиль',
    key: '1',
  },
  {
    label: 'Выйти',
    key: '2',
  },
];

type MenuClickEvent = {
  key: string;
};

export const Header: React.FC = () => {

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };


  const onClick = ({ key }: MenuClickEvent) => {
    switch (key) {
      case '1':
        console.log('1st menu item');
        break;
      case '2':
        handleLogout();
        break;
    }
  };


  return (
    <div className="header">
      <div className="header__left-container">
        <h1 className="header__name">TODO</h1>
        <CarryOutOutlined className="header__logo" />
      </div>
      {isAuthenticated && (
        <div className="header__right-container">
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size={36} className="header__avatar">U</Avatar>
              <DownOutlined className="header__down-outline" />
            </a>
          </Dropdown>
        </div>
      )}
    </div>
  );
};


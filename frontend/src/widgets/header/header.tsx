import './header.scss';
import { CarryOutOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileModalButton } from '@/features/user-profile';
import { handleLogout, selectIsAuthenticated, selectUser } from '@/entities/user';
import { removeCookies, useAppDispatch, useAppSelector } from '@/shared/lib';

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

interface MenuClickEvent {
  key: string;
}

export const Header: React.FC = () => {

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutFunc = () => {
    dispatch(handleLogout());
    removeCookies();
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleProfileClick = () => {
    setIsModalOpen(true);
  }


  const onClick = ({ key }: MenuClickEvent) => {
    switch (key) {
      case '1':
        handleProfileClick();
        break;
      case '2':
        handleLogoutFunc();
        break;
    }
  };
  const userInitial : string = user ? user.charAt(0).toUpperCase() : '';

  return (
    <>
      <ProfileModalButton isOpen={isModalOpen} onClose={handleCancel}/>
      <div className="header">
        <div className="header__left-container">
          <h1 className="header__name">TODO</h1>
          <CarryOutOutlined className="header__logo" />
        </div>
        {isAuthenticated && (
          <div className="header__right-container">
            <Dropdown menu={{ items, onClick }}>
              <Button type="link" onClick={(e) => e.preventDefault()}>
                <Avatar size={36} className="header__avatar">{userInitial}</Avatar>
                <DownOutlined className="header__down-outline" />
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
};


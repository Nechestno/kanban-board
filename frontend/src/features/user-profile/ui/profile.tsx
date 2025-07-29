import { Avatar, Typography } from 'antd';
import React from 'react';
import {  selectUser } from '@/entities/user';
import { IUserData } from '@/shared/api';
import { useAppSelector } from '@/shared/lib';
import { CustomModal } from '@/shared/ui/custom-modal';
import './profile.scss'


interface ButtonProps {
  isOpen: boolean;
  onClose: () => void;
}


export const ProfileModalButton: React.FC<ButtonProps> = ({isOpen=false, onClose}) => {
  const user = useAppSelector(selectUser);
  const { Title } = Typography;

  const userName: string = user ? user : '';
  const userInitial : string = user ? user.charAt(0).toUpperCase() : '';

  return (
    <>
      <div className="profile-modal">
        <CustomModal<IUserData>
          title="Профиль"
          isOpen={isOpen}
          onClose={onClose}
          cancelText="Отмена"
          okText="Ok">
          <div className="profile-modal__content">
          <Avatar size={36} className='profile-modal__avatar'>{userInitial}</Avatar>
          <Title level={4} style={{margin: '0 0 0 10px'}}>{userName}</Title>
          </div>
        </CustomModal>
      </div>
    </>
  );
};


import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { CreateBoardModal } from '@/features/board/create-board';

type CreateButtonProps = {
  className?: string;
};

export const CreateBoardButton: React.FC<CreateButtonProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary"  className={className} onClick={showModal} ><PlusOutlined /></Button>
      <CreateBoardModal isModalOpen={isModalOpen} onClose={handleCancel} ></CreateBoardModal>
    </>
  );
};

import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { UpdateCategoryModal } from '@/features/category/update-category';

interface IUpdateCategoryButtonProps {
  id : string;
}

export const UpdateCategoryButton : React.FC<IUpdateCategoryButtonProps>  = ({id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button type="primary" icon={<EditOutlined />}  onClick={showModal} />
      <UpdateCategoryModal id={id} isModalOpen={isModalOpen} onClose={handleCancel} ></UpdateCategoryModal>
    </>
  );
};
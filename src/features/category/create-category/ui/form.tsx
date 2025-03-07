import React from 'react';
import {Flex, Form} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomInput } from '@/shared/ui/custom-input';
import { CustomButton } from '@/shared/ui/custom-button';
import { ICategoryDataCreate, useCreateCategoryMutation } from '@/entities/category';
import { isErrorWithMessage, useAppSelector, useModal } from '@/shared/lib';
import { selectSelectedBoardId } from '@/entities/board';



export const AddCategoryForm: React.FC =() => {
  const [createCategory] = useCreateCategoryMutation();
  const {showSuccess, showError} = useModal();
  const selectedBoardId = useAppSelector(selectSelectedBoardId);


  const handleFormSubmit = async ({ name }: ICategoryDataCreate) => {
    try {
      await createCategory({ boardId: selectedBoardId, name }).unwrap();

      showSuccess('Доска успешно создана');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <Flex
      justify="start"
      align="center"
      style={{ height: '60px', marginLeft: '10px' }}
    >
      <Form layout='inline' onFinish={handleFormSubmit}>
        <CustomInput
          name='name'
          placeholder="Введите название раздела"
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Form.Item>
        <CustomButton
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
        />
        </Form.Item>
      </Form>
    </Flex>
  )
}
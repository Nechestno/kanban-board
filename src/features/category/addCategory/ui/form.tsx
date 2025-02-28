import React from 'react';
import {Flex, Form} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomInput } from '@/shared/ui/customInput';
import { CustomButton } from '@/shared/ui/customButton';
import { ICategoryDataCreate, useCreateCategoryMutation } from '@/entities/category';
import { isErrorWithMessage, useModal } from '@/shared/lib';

type CategoryFormProps = {
  style?: React.CSSProperties;
  id: string;
};


export const AddCategoryForm: React.FC<CategoryFormProps> =({ id }) => {
  const [createCategory] = useCreateCategoryMutation();
  const {showSuccess, showError} = useModal();

  const handleFormSubmit = async ({ name, tagColor }: ICategoryDataCreate) => {
    try {
      await createCategory({ boardId: id, name, tagColor }).unwrap();

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
import { Button, Form} from 'antd';
import React from 'react';
import { selectSelectedBoardId } from '@/entities/board';
import { useCreateCategoryMutation } from '@/entities/category';
import {ICategoryData} from '@/shared/api';
import { isErrorWithMessage, useAppSelector, useModal } from '@/shared/lib';
import { CustomFormInput } from '@/shared/ui/custom-input';
import './form.scss'



export const AddCategoryForm: React.FC =() => {
  const [createCategory] = useCreateCategoryMutation();
  const {showSuccess, showError} = useModal();
  const selectedBoardId = useAppSelector(selectSelectedBoardId);

  const handleFormSubmit = async ({ name }: ICategoryData) => {
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

      <Form layout='inline' className='category-form' onFinish={handleFormSubmit}>
        <CustomFormInput
          name='name'
          placeholder="Введите название категории"
          className='category-form__input'
          rules={[{ required: true, message: 'Пожалуйста введите название категории!' }]}
        />
        <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className='category-form__button'
        >
          Создать категорию
        </Button>
        </Form.Item>
      </Form>
  )
}
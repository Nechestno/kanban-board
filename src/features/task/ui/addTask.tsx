import React, { useState } from 'react';
import { DatePicker, Drawer, Form, Input, Select } from 'antd';
import { CustomButton } from '@/shared/ui/customButton';
import { PlusOutlined } from '@ant-design/icons';
import {  IResponseCategoryData } from '@/entities/category';
import { ITaskCardData, useCreateTaskMutation } from '@/entities/task';
import { CustomInput } from '@/shared/ui/customInput';
import { taskTypesOptions } from '@/shared/model';
import { isErrorWithMessage, useModal } from '@/shared/lib';


export const AddTask:React.FC<IResponseCategoryData>  = (category) => {

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [createTask] = useCreateTaskMutation();
  const { showSuccess, showError } = useModal();
  const [selectedTaskType, setSelectedTaskType] = useState(taskTypesOptions[0].value);
  console.log(selectedTaskType);

  const handleFormSubmit = async (data: ITaskCardData) => {
    try {
      await createTask({ categoryId: category.id, ...data}).unwrap();
      setOpen(false);
      showSuccess('Задание успешно добавлено');

    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  const handleChangeSelect = (value: string) => {
    setSelectedTaskType(value);
  };


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton type="primary" icon={<PlusOutlined />} style={{ width: '25%' }} onClick={showDrawer} />
      <Drawer title={`Добавить задание в "${category.name}"`} onClose={onClose} open={open} width={600}>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <CustomInput name="title"
                       label="Название задания"
                       placeholder="Введите название"
                       rules={[{ required: true, message: 'Пожалуйста, введите название задания!' }]}
          />
          <Form.Item name="type" label="Тип задания" >
            <Select
              style={{ width: '100%' }}
              options={taskTypesOptions}
              value={selectedTaskType}
              onChange={handleChangeSelect}
            />
          </Form.Item>
          <Form.Item name="description" label="Описание задания">
            <TextArea showCount
                      maxLength={500}
                      placeholder="Введите описание"
                      style={{ height: 120 }}/>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Срок выполнения"
            rules={[{ required: true, message: 'Пожалуйста, выберите срок окончания задания!' }]}
          >
            <DatePicker style={{ width: '100%' }} placeholder='Выберите срок выполнения'/>
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit" style={{ width: '100%' }}>
              Добавить задание
            </CustomButton>
          </Form.Item>
        </Form>
      </Drawer>

    </>
  );
};

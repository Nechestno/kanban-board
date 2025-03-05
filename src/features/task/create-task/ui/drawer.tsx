import React, { useState } from 'react';
import { DatePicker, Drawer, Form, Input, Select } from 'antd';
import { CustomButton } from '@/shared/ui/custom-button';
import { PlusOutlined } from '@ant-design/icons';
import { ITaskCardData, useCreateTaskMutation } from '@/entities/task';
import { CustomInput } from '@/shared/ui/custom-input';
import { taskTypesOptions } from '@/shared/model';
import { isErrorWithMessage, useModal } from '@/shared/lib';

interface ICreateTaskProps {
  id: string;
  name: string;
}


export const AddTask : React.FC<ICreateTaskProps>  = ({id, name}) => {

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [createTask] = useCreateTaskMutation();
  const { showSuccess, showError } = useModal();
  const [selectedTaskType, setSelectedTaskType] = useState(taskTypesOptions[0].value);

  const handleFormSubmit = async (data: ITaskCardData) => {
    try {
      await createTask({ categoryId: id, ...data}).unwrap();
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
      <CustomButton type="primary" icon={<PlusOutlined />} style={{ width: '100%', marginTop: '20px'}} onClick={showDrawer} >Добавить задание</CustomButton>
      <Drawer title={`Добавить задание в "${name}"`} onClose={onClose} open={open} width={600}>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <CustomInput name="title"
                       label="Название задания"
                       placeholder="Введите название"
                       rules={[{ required: true, message: 'Пожалуйста, введите название задания!' }]}
          />
          <Form.Item name="type" label="Тип задания" rules={[{ required: true, message: 'Пожалуйста, выберите тип задания!' }]} >
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

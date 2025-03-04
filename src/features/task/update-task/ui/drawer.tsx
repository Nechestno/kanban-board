import React, { useState } from 'react';
import { DatePicker, Drawer, Form, Input, Select } from 'antd';
import { CustomButton } from '@/shared/ui/custom-button';
import { ITaskCardData, useUpdateTaskMutation } from '@/entities/task';
import { taskTypesOptions } from '@/shared/model';
import { isErrorWithMessage, useModal} from '@/shared/lib';
import dayjs from 'dayjs';
import { ContainerOutlined } from '@ant-design/icons';

interface UpdateTaskButtonProps {
  task: ITaskCardData;
}

export const UpdateTaskDrawer: React.FC<UpdateTaskButtonProps> = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [updateTask] = useUpdateTaskMutation();
  const { showSuccess, showError } = useModal();
  const [isEditable, setIsEditable] = useState(false);

  const handleFormSubmit = async ({id, ...data }: ITaskCardData) => {
    try {
      await updateTask({ id: task.id, ...data }).unwrap();
      setOpen(false);
      showSuccess('Задание успешно обновлено');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  const toggleEditable = () => {
    if (isEditable) {
      setIsEditable(false)
    }
    else {
      setIsEditable(true);
    }

  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ContainerOutlined  onClick={showDrawer}/>
      <Drawer
        title={`Изменить задание "${task.title}"`}
        onClose={onClose}
        open={open}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            title: task.title,
            type: task.type,
            description: task.description,
            dueDate: task.dueDate ? dayjs(task.dueDate) : null,
          }}
        >
          <Form.Item
            name="title"
            label="Название задания"
            rules={[
              { required: true, message: 'Пожалуйста, введите название задания!' },
            ]}
          >
            <Input
              disabled={!isEditable}
              placeholder="Введите название"
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Тип задания"
            rules={[
              { required: true, message: 'Пожалуйста, выберите тип задания!' },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              options={taskTypesOptions}
              disabled={!isEditable}
            />
          </Form.Item>

          <Form.Item name="description" label="Описание задания">
            <TextArea
              showCount
              maxLength={500}
              placeholder="Введите описание"
              style={{ height: 120 }}
              disabled={!isEditable}
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Срок выполнения"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите срок окончания задания!',
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Выберите срок выполнения"
              disabled={!isEditable}
            />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" style={{ width: '100%' }} onClick={toggleEditable}>
              Изменить данные
            </CustomButton>
          </Form.Item>
          {isEditable && (<Form.Item>
            <CustomButton type="primary" htmlType="submit" style={{ width: '100%' }}>
              Сохранить изменения
            </CustomButton>
          </Form.Item>)}
        </Form>
      </Drawer>
    </>
  );
};
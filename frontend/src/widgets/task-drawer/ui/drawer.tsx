import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ITaskCardData } from '@/shared/api';
import { taskTypes, taskTypesOptions } from '@/shared/model';
import './drawer.scss';


interface TaskDrawerProps {
  title: string;
  onSubmit: (data: ITaskCardData) => Promise<void>;
  onClose: () => void;
  onSwitch?: () => void;
  initialValues?: Partial<Omit<ITaskCardData, 'id'>>;
  disabled?: boolean;
  type: 'create' | 'update';
  open: boolean;
}

export const TaskDrawer: React.FC<TaskDrawerProps> = ({
                                                        title,
                                                        onSubmit,
                                                        initialValues = {},
                                                        disabled = false,
                                                        type = 'create',
                                                        open,
                                                        onClose,
                                                        onSwitch,
                                                      }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [selectedTaskType, setSelectedTaskType] = useState(taskTypesOptions[taskTypes.TASK]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    onClose();
  };

  const handleChangeSelect = (value: string) => {
    const taskTypeKey = Object.keys(taskTypesOptions).find(key => taskTypesOptions[key as keyof typeof taskTypesOptions].label === value);
    if (taskTypeKey) {
      setSelectedTaskType(taskTypesOptions[taskTypeKey as keyof typeof taskTypesOptions]);
    }
  };

  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={open}
      width={600}
      className='task-drawer'
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: initialValues.title || '',
          type: initialValues.type || '',
          description: initialValues.description || '',
          dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
        }}
      >
        <Form.Item
          name="title"
          label="Название задания"
          rules={[{ required: true, message: 'Пожалуйста, введите название задания!' }]}
        >
          <Input disabled={disabled} placeholder="Введите название" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Тип задания"
          rules={[{ required: true, message: 'Пожалуйста, выберите тип задания!' }]}
        >
          <Select
            className='task-drawer__select'
            options={Object.entries(taskTypesOptions).map(([key, option]) => ({
              value: key,
              label: option.label,
            }))}
            disabled={disabled}
            value={selectedTaskType.label}
            onChange={handleChangeSelect}
          />
        </Form.Item>

        <Form.Item name="description" label="Описание задания">
          <TextArea
            showCount
            maxLength={500}
            placeholder="Введите описание"
            className="task-drawer__text-area"
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Срок выполнения"
          rules={[{ required: true, message: 'Пожалуйста, выберите срок окончания задания!' }]}
        >
          <DatePicker
            className='task-drawer__date-picker'
            placeholder="Выберите срок выполнения"
            disabled={disabled}
          />
        </Form.Item>
        {type === 'update' && (
          <Form.Item>
            <Button type="primary" htmlType="button" block onClick={onSwitch}>Изменить данные</Button>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block >
            {type === 'create' ? 'Добавить задание' : 'Сохранить изменения'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
import React from 'react';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import { ITaskCardData } from '@/entities/task';
import { calculateDaysDifference } from '@/shared/lib';
import './card.scss';

export const TaskCard: React.FC<ITaskCardData> = (props) => {

  const { Title } = Typography;

  return (
    <Card
      key={props.id}
      size="small"
      className="task-card"
      actions={[<EditOutlined key="edit" />]}
    >
      <Tag color={props.tagColor}>{props.type}</Tag>
      <Title level={5} style={{ marginTop: '10px' }}>{props.title}</Title>
      <p>{props.description}</p>
      <div className="task-card__footer">
        <CalendarOutlined /> {calculateDaysDifference(props.dueDate)} дня(ей)
      </div>
    </Card>
  );
};


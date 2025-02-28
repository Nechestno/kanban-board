import React from 'react';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import { ITaskCardData } from '@/entities/task';
import { calculateDaysDifference, getColorByValue, getTitleByValue } from '@/shared/lib';
import './card.scss';

export const TaskCard: React.FC<ITaskCardData> = (props) => {

  const { Title, Paragraph } = Typography;


  return (
    <Card
      key={props.id}
      size="small"
      className="task-card"
      actions={[<EditOutlined key="edit" />]}
      style={{ maxHeight: '75%' }}
    >
      <Tag color={getColorByValue(props.type)}>{getTitleByValue(props.type)}</Tag>
      <Title level={5} style={{ marginTop: '10px' }}>{props.title}</Title>
      <Paragraph ellipsis={{rows: 3}}>{props.description}</Paragraph>
      <div className="task-card__footer">
        <CalendarOutlined /> осталось {calculateDaysDifference(props.dueDate)} дня(ей)
      </div>
    </Card>
  );
};


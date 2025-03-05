import React from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import { ITaskCardData } from '@/entities/task';
import { calculateDaysDifference, getColorByValue, getTitleByValue } from '@/shared/lib';
import './card.scss';
import { DeleteTaskButton } from '@/features/task/delete-task';
import { UpdateTaskDrawer } from '@/features/task/update-task';

export const TaskCard: React.FC<ITaskCardData> = (props) => {

  const { Title, Paragraph } = Typography;

  return (
    <Card
      key={props.id}
      size="small"
      className="task-card"
      actions={[<UpdateTaskDrawer task={props} />, <DeleteTaskButton taskId={props.id} />]}
      style={{ maxHeight: '75%', maxWidth: '100%' }}
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


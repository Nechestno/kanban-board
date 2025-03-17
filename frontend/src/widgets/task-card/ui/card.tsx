import { CalendarOutlined } from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DeleteTaskButton } from '@/features/task/delete-task';
import { UpdateTaskButton } from '@/features/task/update-task';
import { ITaskCardData } from '@/entities/task';
import { calculateDaysDifference } from '@/shared/lib';
import './card.scss';
import { taskTypes, taskTypesOptions } from '@/shared/model';


export const TaskCard: React.FC<ITaskCardData> = (props) => {

  const { Title, Paragraph } = Typography;
  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    const day = calculateDaysDifference(dayjs(props.dueDate))
    setDays(day)
  }, [props.dueDate]);

  return (
    <Card
      key={props.id}
      size="small"
      className="task-card"
      actions={[<UpdateTaskButton key={props.id} task={props} />, <DeleteTaskButton key={props.id} taskId={props.id} />]}
    >
      <Tag color={taskTypesOptions[props.type as taskTypes].color}>{taskTypesOptions[props.type as taskTypes].label}</Tag>
      <Title level={5} className='task-card__title' >{props.title}</Title>
      <Paragraph ellipsis={{rows: 3}}>{props.description}</Paragraph>
      <div className="task-card__footer" style={{color: days === 0 ? 'red' : ''}}>
        <CalendarOutlined /> осталось {days} дня(ей)
      </div>
    </Card>
  );
};


import React from 'react';
import {Card, Space} from "antd";
import {ICards} from "../../types/cards.types.ts";
import {useSelector, useDispatch} from "react-redux";
import { CloseOutlined } from '@ant-design/icons';
import {removeTodo} from "../../store/toDoSlice.ts";
import './style.scss'

const ToDoList  = () => {
    const toDos: ICards[] = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    const removeCard = (value: string) => dispatch(removeTodo(value));

    return (
        <div>
            <Space direction={'vertical'}>
            {toDos.map((todo) => (
                <Card key={todo.id} title={todo.name} className='card' bordered={true} actions={[<CloseOutlined key="remove" onClick={() => removeCard(todo.id)} />]} >
                    <p>{todo.text}</p>
                </Card>
            ))}
            </Space>
        </div>
    );
}

export default ToDoList;

import React, {useEffect} from 'react';
import {Card, Space} from "antd";
import {ICards} from "../../types/cards.types.ts";
import {useSelector, useDispatch} from "react-redux";
import { CloseOutlined } from '@ant-design/icons';
import {addTodo, fetchTodos, removeTodo} from "../../store/toDoSlice.ts";
import './style.scss'
import {useAppDispatch, useAppSelector} from "../../hooks.ts";

const ToDoList  = () => {
    const toDos = useAppSelector(state => state.todos.list);

    const dispatch = useAppDispatch();
    const removeCard = (value: string) => dispatch(removeTodo(value));

    return (
        <div>
            <Space direction={'horizontal'} wrap='true'>
            {toDos.map((todo) => (
                <Card key={todo.id} title={todo.id} className='card' bordered={true} actions={[<CloseOutlined key="remove" onClick={() => removeCard(todo.id)} />]} >
                    <p>{todo.title}</p>
                </Card>
            ))}
            </Space>
        </div>
    );
}

export default ToDoList;

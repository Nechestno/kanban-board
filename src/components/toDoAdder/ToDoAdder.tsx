import React, {useState} from 'react';
import './style.scss'
import {Input, Button, Space, Select} from 'antd';
import {ICards} from "../../types/cards.types.ts";
import {useDispatch} from "react-redux";
import {addTodo} from "../../store/toDoSlice.ts";
import { v4 as uuidv4 } from 'uuid';

const ToDoAdder = () => {
    const [selectValue, setSelectValue] = useState<ICards>(null);
    const [todoText, setTodoText] = useState<string>('');
    const [todoName, setTodoName] = useState<string>('');

    const onChangeText = (value:string) => {
        setTodoText(value)
        setSelectValue({ id: uuidv4(), name: todoName, text: todoText });

    }

    const onChangeName = (value:string) => {
        setTodoName(value)
        setSelectValue({ id: uuidv4(), name: todoName, text: todoText });
    }
    const onChangeSelect = (value: string) => {

    };
    const dispatch = useDispatch();

    const addCard = () => {
        dispatch(addTodo(selectValue));
        setTodoText('');
        setTodoName('');
    }

    return (
        <div className='side_bar'>
            <h1>Добавить ToDo</h1>
            <Input className='sb_input'
            value={todoName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Enter ToDo name"  ></Input>
            <Input className='sb_input'
                   value={todoText}
                   onChange={(e) => onChangeText(e.target.value)}
                   placeholder="Enter ToDo text"  ></Input>
            <Select className='sb_select' onChange={onChangeSelect}></Select>
            <Button className='sb_button' type='primary'  onClick={addCard} > Добавить ToDo</Button>
        </div>
    );
}

export default ToDoAdder;

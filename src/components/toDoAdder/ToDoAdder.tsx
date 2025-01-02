import React, {useState} from 'react';
import './style.scss'
import {Input, Button, Space, Select} from 'antd';
import {ICards} from "../../types/cards.types.ts";
import {useDispatch} from "react-redux";
import {addTodo} from "../../store/toDoSlice.ts";
import { v4 as uuidv4 } from 'uuid';
import {useAppDispatch} from "../../hooks.ts";

const ToDoAdder = () => {
    const [selectValue, setSelectValue] = useState<ICards>(null);
    const [todoText, setTodoText] = useState<string>('');
    const [todoName, setTodoName] = useState<string>('');
    const dispatch = useAppDispatch();

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

    const addCard = () => {
        dispatch(addTodo(selectValue));
        setTodoText('');
        setTodoName('');
    }

    return (
        <div className='side-bar'>
            <h1 className='side-bar__title'>Добавить ToDo</h1>
            <Input className='side-bar__input'
            value={todoName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Enter ToDo name"  ></Input>
            <Input className='side-bar__input'
                   value={todoText}
                   onChange={(e) => onChangeText(e.target.value)}
                   placeholder="Enter ToDo text"  ></Input>
            <Select className='side-bar__select' onChange={onChangeSelect}></Select>
            <Button className='side-bar__button' type='primary'  onClick={addCard} > Добавить ToDo</Button>
        </div>
    );
}

export default ToDoAdder;

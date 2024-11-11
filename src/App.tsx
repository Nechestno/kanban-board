import {useEffect, useState} from 'react';
import './style.scss';
import Layout from './components/Layout/Layout';
import ToDoAdder from './components/toDoAdder/ToDoAdder';
import ToDoList from './components/toDoList/ToDoList';
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {fetchTodos} from "./store/toDoSlice.ts";
import {Alert, Spin} from "antd";


function App() {
    const { loading, error } = useAppSelector(state => state.todos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

  return (
    <Layout>
      <div className='layout_divider'>
        <ToDoAdder/>
          {loading && <Spin/>}
          {error && <Alert message={error} type="warning" />}
        <ToDoList/>
      </div>
    </Layout>
  )
}

export default App

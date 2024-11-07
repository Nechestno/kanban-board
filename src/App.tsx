import { useState } from 'react';
import './style.scss';
import Layout from './components/Layout/Layout';
import ToDoAdder from './components/toDoAdder/ToDoAdder';
import ToDoList from './components/toDoList/ToDoList';


function App() {

  return (
    <Layout>
      <div className='layout_divider'>
        <ToDoAdder/>
        <ToDoList/>
      </div>
    </Layout>
  )
}

export default App

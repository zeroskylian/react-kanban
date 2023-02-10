import React, { useState, useEffect } from 'react';
import './App.css';
import Kanban, { KanbanProps } from './components/Kanban/Kanban';
import { KanbanCardProps } from '@components/KanbanCard';
import { KanbanSectionProps } from '@components/KanbanSection';

const DATA_STORE_KEY = 'kanban-data-store';

function App() {
  const [todoList, setTodoList] = useState<KanbanCardProps[]>([]);
  const [ongoingList, setOngoingList] = useState<KanbanCardProps[]>([]);
  const [doneList, setDoneList] = useState<KanbanCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddTodo = (card: KanbanSectionProps, todo: KanbanCardProps) => {
    if (card.id === '1') {
      setTodoList([todo, ...todoList]);
    } else if (card.id === '2') {
      setOngoingList([todo, ...ongoingList]);
    } else {
      setDoneList([todo, ...doneList]);
    }
  };

  const handleSaveTodo = () => {
    const cache: KanbanProps = {
      todo: todoList,
      ongoing: ongoingList,
      done: doneList,
    };
    const jsonString = JSON.stringify(cache);
    window.localStorage.setItem(DATA_STORE_KEY, jsonString);
  };

  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const cache = JSON.parse(data);
        setTodoList(cache.todo);
        setOngoingList(cache.ongoing);
        setDoneList(cache.done);
      }
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        &nbsp;
        <button onClick={handleSaveTodo}>保存</button>
      </header>
      <Kanban
        todo={todoList}
        ongoing={ongoingList}
        done={doneList}
        onSaveTodo={handleAddTodo}
        loading={loading}
      />
    </div>
  );
}

export default App;

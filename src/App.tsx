import React, { useState, useEffect } from 'react';
import './App.css';
import Kanban, { KanbanProps } from './components/Kanban';
import { KanbanCardProps } from '@components/KanbanCard';
import AdminContext from 'context/AdminContext';

const DATA_STORE_KEY = 'kanban-data-store';

enum KanbanEnum {
  todo = 'todo',
  ongoing = 'ongoing',
  done = 'done',
}
export { KanbanEnum };

function App() {
  const [todoList, setTodoList] = useState<KanbanCardProps[]>([]);
  const [ongoingList, setOngoingList] = useState<KanbanCardProps[]>([]);
  const [doneList, setDoneList] = useState<KanbanCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const updaters = {
    [KanbanEnum.todo]: setTodoList,
    [KanbanEnum.ongoing]: setOngoingList,
    [KanbanEnum.done]: setDoneList,
  };

  const handleAddTodo = (card: KanbanEnum, todo: KanbanCardProps) => {
    updaters[card as KanbanEnum]((prev) => {
      return [todo, ...prev];
    });
  };

  const handleRemoveTodo = (card: KanbanEnum, id: string) => {
    updaters[card as KanbanEnum]((prev) => {
      return prev.slice().filter((item) => {
        return item.id !== id;
      });
    });
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

  const handleToggleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(!isAdmin)
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
        <label>
          <input
            type="checkbox"
            value={isAdmin ? 1 : 0}
            onChange={handleToggleAdmin}
          />
          管理员模式
        </label>
      </header>

      <AdminContext.Provider value={{ isAdmin }}>
        <Kanban
          todo={todoList}
          ongoing={ongoingList}
          done={doneList}
          onSaveTodo={handleAddTodo}
          onRemoveTodo={handleRemoveTodo}
          loading={loading}
        />
      </AdminContext.Provider>
    </div>
  );
}

export default App;

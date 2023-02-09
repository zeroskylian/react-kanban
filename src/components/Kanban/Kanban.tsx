import React, { useEffect, useState } from 'react';
import './index.css';
import KanbanSection, { KanbanSectionProps } from '../KanbanSection';
import { KanbanCardProps } from '@components/KanbanCard';

type KanbanCache = {
  todo: KanbanCardProps[];
  ongoing: KanbanCardProps[];
  done: KanbanCardProps[];
};

const DATA_STORE_KEY = 'kanban-data-store';

export default function Kanban() {
  const cards: KanbanSectionProps[] = [
    {
      id: '1',
      title: '待处理',
      color: '#C9AF97',
      canShowAdd: true,
    },
    {
      id: '2',
      title: '进行中',
      color: '#FFE799',
      canShowAdd: false,
    },
    {
      id: '3',
      title: '已完成',
      color: '#C0E8BA',
      canShowAdd: false,
    },
  ];
  const [todoList, setTodoList] = useState<KanbanCardProps[]>([]);
  const [ongoingList, setOngoingList] = useState<KanbanCardProps[]>([]);
  const [doneList, setDoneList] = useState<KanbanCardProps[]>([]);
  const list = [todoList, ongoingList, doneList];

  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const cache: KanbanCache = JSON.parse(data);
        setTodoList(cache.todo);
        setOngoingList(cache.ongoing);
        setDoneList(cache.done);
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddTodo = (card: KanbanSectionProps, todo: KanbanCardProps[]) => {
    if (card.id === '1') {
      setTodoList(todo);
    } else if (card.id === '2') {
      setOngoingList(todo);
    } else {
      setDoneList(todo);
    }
  };

  const handleSaveTodo = () => {
    const cache: KanbanCache = {
      todo: todoList,
      ongoing: ongoingList,
      done: doneList,
    };
    const jsonString = JSON.stringify(cache);
    window.localStorage.setItem(DATA_STORE_KEY, jsonString);
  };

  const [loading, setLoading] = useState(true);
  return (
    <main className="kanban-board">
      <section className="kanban-toolbar">
        <button onClick={handleSaveTodo}>保存</button>
      </section>
      <div>
        {loading ? (
          <KanbanLoading />
        ) : (
          cards.map((card, index) => {
            return (
              <KanbanSection
                key={card.id}
                {...card}
                todo={list[index]}
                onAddTodo={handleAddTodo}
              />
            );
          })
        )}
      </div>
    </main>
  );
}

function KanbanLoading() {
  return (
    <section className="kanban-column" style={{backgroundColor:"gray"}}>
      <h2>加载中</h2>
    </section>
  );
}

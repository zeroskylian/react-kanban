import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';
import KanbanNewCard from '@components/KanbanNewCard/KanbanNewCard';

export type KanbanSectionProps = {
  id: string;
  title: string;
  color: string;
  todo: KanbanCardProps[];
  canShowAdd: boolean;
};

export default function KanbanSection(props: KanbanSectionProps) {
  const { canShowAdd } = props;
  const [todolist, setTodoList] = useState<KanbanCardProps[]>([]);
  const renderProps = (
    <ul>
      {todolist.map((card) => {
        return <KanbanCard key={card.id} {...card} />;
      })}
    </ul>
  );
  const [showAdd, setShowAdd] = useState(false);
  const handleSubmit = (text: string) => {
    const card: KanbanCardProps = { id: nanoid(), title: text, date: new Date().toLocaleString() };
    const list = [card, ...todolist];
    console.log(list);
    setTodoList(list);
  };
  return (
    <section className="kanban-column" style={{ backgroundColor: props.color }}>
      <h2>
        {props.title}{' '}
        {canShowAdd && (
          <button
            onClick={() => {
              setShowAdd(!showAdd);
            }}>
            &#8853; 添加新卡片
          </button>
        )}
      </h2>
      {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
      {todolist.length > 0 && renderProps}
    </section>
  );
}

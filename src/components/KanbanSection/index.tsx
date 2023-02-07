import React, { useState } from 'react';
import './index.css';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';
import KanbanNewCard from '../KanbanNewCard/KanbanNewCard';

export type KanbanSectionProps = {
  id: string;
  title: string;
  color: string;
  todo: KanbanCardProps[];
};

export default function KanbanSection(props: KanbanSectionProps) {
  const renderProps = (
    <ul>
      {props.todo.map((card) => {
        return <KanbanCard key={card.id} {...card} />;
      })}
    </ul>
  );
  const [showAdd, setShowAdd] = useState(false);
  const handleSubmit = (text: string) => {

  };
  return (
    <section className="kanban-column" style={{ backgroundColor: props.color }}>
      <h2>
        {props.title}{' '}
        <button
          onClick={() => {
            setShowAdd(!showAdd);
          }}>
          &#8853; 添加新卡片
        </button>
      </h2>
      {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
      {props.todo.length && renderProps}
    </section>
  );
}

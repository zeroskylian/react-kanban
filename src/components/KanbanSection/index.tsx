import React from 'react';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';
import './index.css';

export type KanbanSectionProps = {
  id: string;
  title: string;
  color: string;
  todo: KanbanCardProps[];
};

export default function KanbanSection(props: KanbanSectionProps) {
  console.log([props.todo.length]);

  const renderProps = (
    <ul >
      {props.todo.map((card) => {
        return (
            <KanbanCard key={card.id} {...card} />
        );
      })}
    </ul>
  );

  return (
    <section className="kanban-column" style={{ backgroundColor: props.color }}>
      <h2>{props.title} <button>&#8853; 添加新卡片</button></h2>
      
      {props.todo.length ? renderProps : null}
    </section>
  );
}

import React from 'react';
import './index.css';

export type KanbanCardProps = {
  id: string;
  title: string;
  color: string;
};

export default function KanbanCard(props: KanbanCardProps) {
  return (
    <section className="kanban-column" style={{ backgroundColor: props.color }}>
      <h2>{props.title}</h2>
    </section>
  );
}

import React from 'react';
import './index.css';

export type KanbanCardProps = {
  id: string;
  title: string;
  date: string;
};

export default function KanbanCard(props: KanbanCardProps) {
  return (
    <li className="kanban-card">
      <div className="card-title">{props.title}</div>
      <div className="card-status">{props.date}</div>
    </li>
  );
}

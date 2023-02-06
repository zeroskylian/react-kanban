import React from 'react';
import './index.css';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';

export default function Kanban() {
  const cards: KanbanCardProps[] = [
    { id: '1', title: '待处理', color: '#C9AF97' },
    { id: '2', title: '进行中', color: '#FFE799' },
    { id: '3', title: '已完成', color: '#C0E8BA' },
  ];
  return (
    <main className="kanban-board">
      {cards.map((card) => {
        return <KanbanCard key={card.id} {...card} />;
      })}
    </main>
  );
}

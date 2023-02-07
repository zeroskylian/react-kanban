import React from 'react';
import './index.css';
import KanbanSection, { KanbanSectionProps } from '../KanbanSection';

export default function Kanban() {
  const todos = Array(20)
    .fill('')
    .map((_, index) => {
      return {
        id: String(index),
        title: '开发任务-1',
        date: new Date().toDateString(),
      };
    });
  const cards: KanbanSectionProps[] = [
    { id: '1', title: '待处理', color: '#C9AF97', todo: todos },
    { id: '2', title: '进行中', color: '#FFE799', todo: todos },
    { id: '3', title: '已完成', color: '#C0E8BA', todo: todos },
  ];
  return (
    <main className="kanban-board">
      {cards.map((card) => {
        return <KanbanSection key={card.id} {...card} />;
      })}
    </main>
  );
}

import React from 'react';

export default function KanbanNewCard() {
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" />
      </div>
    </li>
  );
}

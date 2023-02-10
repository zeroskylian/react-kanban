import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';
import KanbanNewCard from '@components/KanbanNewCard/KanbanNewCard';

export type KanbanSectionProps = {
  id: string;
  title: string;
  color: string;
  canShowAdd: boolean;
};

export default function KanbanSection(
  props: KanbanSectionProps & {
    todo: KanbanCardProps[];
    onAddTodo: (card: KanbanSectionProps, todo: KanbanCardProps) => void;
  }
) {
  const { canShowAdd } = props;
  const todolist = props.todo;
  const renderProps = (
    <ul>
      {todolist.map((card) => {
        return <KanbanCard key={card.id} {...card} />;
      })}
    </ul>
  );
  const [showAdd, setShowAdd] = useState(false);
  const handleSubmit = (text: string) => {
    const card: KanbanCardProps = {
      id: nanoid(),
      title: text,
      date: new Date().toLocaleString(),
    };
    props.onAddTodo(props, card);
  };
  return (
    <section
      className="kanban-column"
      style={{ backgroundColor: props.color }}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'none'
      }}
      onDrop={(e) => {
        e.preventDefault()
      }}
      onDragEnd={(e) => {
        e.preventDefault()
      }}>
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

import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './index.css';
import KanbanCard, { KanbanCardProps } from '../KanbanCard';
import KanbanNewCard from '@components/KanbanNewCard/KanbanNewCard';
import { KanbanEnum } from 'App';

// 用于UI 数据
export type KanbanSectionProps = {
  id: KanbanEnum;
  title: string;
  color: string;
  canShowAdd: boolean;
};

// 用于列表数据
export type KanbanSectionTodoProps = {
  todo: KanbanCardProps[];
  onAddTodo: (card: KanbanEnum, todo: KanbanCardProps) => void;
};

// 用于拖拽数据
export type KanbanSectionDragProps = {
  setDraggedItem: React.Dispatch<React.SetStateAction<KanbanCardProps | null>>;
  setIsDragSource: (args: boolean) => void;
  setIsDragTarget: (args: boolean) => void;
  onDrop: () => void;
};

export default function KanbanSection(
  props: KanbanSectionProps & KanbanSectionDragProps & KanbanSectionTodoProps
) {
  const {
    canShowAdd,
    setDraggedItem,
    setIsDragSource,
    setIsDragTarget,
    onDrop,
  } = props;
  const todolist = props.todo;
  const renderProps = (
    <ul>
      {todolist.map((card) => {
        return (
          <KanbanCard
            key={card.id}
            {...card}
            onDragStart={() => {
              setDraggedItem(card);
            }}
          />
        );
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
    props.onAddTodo(props.id, card);
  };

  return (
    <section
      className="kanban-column"
      style={{ backgroundColor: props.color }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        setIsDragSource(true);
        setIsDragTarget(true);
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

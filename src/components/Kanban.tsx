import React, { useState } from 'react';
import KanbanSection, { KanbanSectionProps } from './KanbanSection';
import { KanbanCardProps } from '@components/KanbanCard';
import { KanbanEnum } from 'App';

export type KanbanProps = {
  [KanbanEnum.todo]: KanbanCardProps[];
  [KanbanEnum.ongoing]: KanbanCardProps[];
  [KanbanEnum.done]: KanbanCardProps[];
};

export default function Kanban(
  props: KanbanProps & {
    onSaveTodo: (card: KanbanEnum, todo: KanbanCardProps) => void;
    onRemoveTodo: (card: KanbanEnum, id: string) => void;
    loading: boolean;
  }
) {
  const { todo, ongoing, done, loading } = props;
  const { onSaveTodo, onRemoveTodo } = props;

  const cards: KanbanSectionProps[] = [
    {
      id: KanbanEnum.todo,
      title: '待处理',
      color: '#C9AF97',
      canShowAdd: true,
    },
    {
      id: KanbanEnum.ongoing,
      title: '进行中',
      color: '#FFE799',
      canShowAdd: false,
    },
    {
      id: KanbanEnum.done,
      title: '已完成',
      color: '#C0E8BA',
      canShowAdd: false,
    },
  ];
  const list = [todo, ongoing, done];

  const [draggedItem, setDraggedItem] = useState<KanbanCardProps | null>(null);
  const [dragSource, setDragSource] = useState<KanbanEnum | null>(null);
  const [dragTarget, setDragTarget] = useState<KanbanEnum | null>(null);

  const handleDrop = () => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    dragSource && onRemoveTodo(dragSource, draggedItem.id);
    dragTarget && onSaveTodo(dragTarget, draggedItem);
  };

  return (
    <main className="kanban-board">
      {loading ? (
        <KanbanLoading />
      ) : (
        cards.map((card, index) => {
          return (
            <KanbanSection
              key={card.id}
              {...card}
              todo={list[index]}
              onAddTodo={props.onSaveTodo}
              onRemoveTodo={onRemoveTodo}
              setDraggedItem={setDraggedItem}
              setIsDragSource={(isDragSource) => {
                setDragSource(isDragSource ? card.id : null);
              }}
              setIsDragTarget={(isDragTarget) => {
                setDragTarget(isDragTarget ? card.id : null);
              }}
              onDrop={handleDrop}
            />
          );
        })
      )}
    </main>
  );
}

function KanbanLoading() {
  return (
    <section className="kanban-column" style={{ backgroundColor: 'gray' }}>
      <h2>加载中</h2>
    </section>
  );
}

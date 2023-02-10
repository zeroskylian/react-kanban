import React, { useEffect, useState } from 'react';
import './index.css';
import KanbanSection, { KanbanSectionProps } from '../KanbanSection';
import { KanbanCardProps } from '@components/KanbanCard';

export type KanbanProps = {
  todo: KanbanCardProps[];
  ongoing: KanbanCardProps[];
  done: KanbanCardProps[];
};

export default function Kanban(
  props: KanbanProps & {
    onSaveTodo: (card: KanbanSectionProps, todo: KanbanCardProps) => void;
    loading: boolean;
  }
) {
  const { todo, ongoing, done, loading } = props;

  const cards: KanbanSectionProps[] = [
    {
      id: '1',
      title: '待处理',
      color: '#C9AF97',
      canShowAdd: true,
    },
    {
      id: '2',
      title: '进行中',
      color: '#FFE799',
      canShowAdd: false,
    },
    {
      id: '3',
      title: '已完成',
      color: '#C0E8BA',
      canShowAdd: false,
    },
  ];
  const list = [todo, ongoing, done];

  // const [draggedItem, setDraggedItem] = useState(null);
  // const [dragSource, setDragSource] = useState(null);
  // const [dragTarget, setDragTarget] = useState(null);

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

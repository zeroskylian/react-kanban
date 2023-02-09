import React, { useState, useRef, useEffect } from 'react';
import '../KanbanCard/index.css';

export default function KanbanNewCard(props: {
  onSubmit: (arg: string) => void;
}) {
  const [title, setTitle] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="kanban-card" style={{ margin: '1rem' }}>
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          ref={ref}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.onSubmit(title);
              setTitle('');
            }
          }}
        />
      </div>
    </div>
  );
}

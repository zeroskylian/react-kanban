import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import AdminContext from 'context/AdminContext';

export type KanbanCardProps = {
  id: string;
  title: string;
  date: string;
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

export default function KanbanCard(
  props: KanbanCardProps & {
    onDragStart: () => void;
    onRemove: (id: string) => void;
  }
) {
  const { title, date, onDragStart } = props;
  const [displayTime, setDisplayTime] = useState(props.date);
  const context = useContext(AdminContext);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date(date).getTime() - new Date().getTime();
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [date]);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', title);
    onDragStart();
  };

  return (
    <li className="kanban-card" draggable onDragStart={handleDragStart}>
      <div className="card-title">{title}</div>
      <div className="card-status">
        {displayTime}{' '}
        {context.isAdmin && (
          <button
            onClick={() => {
              props.onRemove(props.id);
            }}>
            X
          </button>
        )}
      </div>
    </li>
  );
}

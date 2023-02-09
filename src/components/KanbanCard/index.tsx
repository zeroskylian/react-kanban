import React, { useState, useEffect } from 'react';
import './index.css';
import {} from 'date-fns';

export type KanbanCardProps = {
  id: string;
  title: string;
  date: string;
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

export default function KanbanCard(props: KanbanCardProps) {
  const { date } = props
  const [displayTime, setDisplayTime] = useState(props.date);
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

  return (
    <li className="kanban-card">
      <div className="card-title">{props.title}</div>
      <div className="card-status">{displayTime}</div>
    </li>
  );
}

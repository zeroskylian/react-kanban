import React from 'react';
import './App.css';
import Kanban from './components/Kanban/Kanban';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
      </header>
      <Kanban />
    </div>
  );
}

export default App;

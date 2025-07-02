import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const TaskDashboard = ({ user, onLogout, tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Tracker</h1>
          <div className="user-info">
            <span>Welcome, {user}!</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <TaskForm onAddTask={onAddTask} />
          <TaskFilter tasks={tasks} />
          <TaskList 
            tasks={tasks} 
            onUpdateTask={onUpdateTask} 
            onDeleteTask={onDeleteTask} 
          />
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;

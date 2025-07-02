import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import SearchBar from './SearchBar';

const TaskDashboard = ({ 
  user, 
  onLogout, 
  tasks, 
  filteredTasks,
  onAddTask, 
  onUpdateTask, 
  onDeleteTask,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange
}) => {
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
          
          <div className="controls-section">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              totalTasks={tasks.length}
              filteredCount={filteredTasks.length}
            />
            <TaskFilter 
              tasks={tasks}
              currentFilter={currentFilter}
              onFilterChange={onFilterChange}
            />
          </div>
          
          <TaskList 
            tasks={filteredTasks} 
            onUpdateTask={onUpdateTask} 
            onDeleteTask={onDeleteTask}
            currentFilter={currentFilter}
            searchQuery={searchQuery}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;

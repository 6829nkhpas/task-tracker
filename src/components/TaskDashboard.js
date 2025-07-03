import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import SearchBar from "./SearchBar";
import TaskStats from "./TaskStats";
import ExportImport from "./ExportImport";

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
  onSearchChange,
  isDarkMode,
  onImportTasks,
  onThemeToggle,
}) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Tracker</h1>
          <div className="user-info">
            <span className="user-welcome">Welcome, {user}!</span>
            <button
              className="theme-toggle header-theme-toggle"
              onClick={onThemeToggle}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <TaskForm onAddTask={onAddTask} />

          <TaskStats tasks={tasks} />

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
            <ExportImport tasks={tasks} onImportTasks={onImportTasks} />
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

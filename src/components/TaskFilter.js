import React, { useMemo } from 'react';

const TaskFilter = ({ tasks, currentFilter, onFilterChange }) => {
  const taskCounts = useMemo(() => {
    if (!tasks) {
      return { all: 0, pending: 0, completed: 0 };
    }

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    
    return {
      all: tasks.length,
      pending,
      completed
    };
  }, [tasks]);

  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, emoji: '📋' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, emoji: '⏳' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, emoji: '✅' }
  ];

  const handleFilterClick = (filterKey) => {
    onFilterChange(filterKey);
  };

  return (
    <div className="task-filter-container">
      <h2>Filter Tasks</h2>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.key)}
          >
            <span className="filter-emoji">{filter.emoji}</span>
            <span className="filter-text">
              {filter.label} ({filter.count})
            </span>
          </button>
        ))}
      </div>
      
      {taskCounts.all > 0 && (
        <div className="task-stats">
          <div className="progress-info">
            <p>
              <strong>Progress:</strong> {taskCounts.completed} of {taskCounts.all} tasks completed 
              ({taskCounts.all > 0 ? Math.round((taskCounts.completed / taskCounts.all) * 100) : 0}%)
            </p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${taskCounts.all > 0 ? (taskCounts.completed / taskCounts.all) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
          
          {currentFilter !== 'all' && (
            <div className="active-filter-info">
              <span className="filter-indicator">
                Currently showing: <strong>{filters.find(f => f.key === currentFilter)?.label}</strong>
              </span>
              <button 
                onClick={() => onFilterChange('all')} 
                className="clear-filter-button"
              >
                Show All Tasks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilter;

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
    <div className="filter-container">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.key)}
        >
          <span>{filter.label}</span>
          <span className="count">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;

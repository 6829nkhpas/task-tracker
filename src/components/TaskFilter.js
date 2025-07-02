import React, { useState, useMemo } from 'react';

const TaskFilter = ({ tasks }) => {
  const [activeFilter, setActiveFilter] = useState('all');

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
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="task-filter-container">
      <h2>Task Overview</h2>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-button ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
      {taskCounts.all > 0 && (
        <div className="task-stats">
          <p>
            Progress: {taskCounts.completed} of {taskCounts.all} tasks completed 
            ({taskCounts.all > 0 ? Math.round((taskCounts.completed / taskCounts.all) * 100) : 0}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;

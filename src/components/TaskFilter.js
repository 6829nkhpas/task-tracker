import React, { useState } from 'react';

const TaskFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All', count: 5 },
    { key: 'pending', label: 'Pending', count: 3 },
    { key: 'completed', label: 'Completed', count: 2 }
  ];

  return (
    <div className="task-filter-container">
      <h2>Filter Tasks</h2>
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
    </div>
  );
};

export default TaskFilter;

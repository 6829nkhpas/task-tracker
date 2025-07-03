import React, { useMemo } from 'react';

const TaskStats = ({ tasks }) => {
  const stats = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return { total: 0, completed: 0, pending: 0, percentage: 0 };
    }

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, percentage };
  }, [tasks]);

  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="progress-section">
      <div className="progress-header">
        <div className="progress-title">
          📈 Progress Overview
        </div>
        <div className="progress-stats">
          {stats.completed} of {stats.total} completed ({stats.percentage}%)
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${stats.percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TaskStats;

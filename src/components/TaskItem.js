import React from 'react';

const TaskItem = ({ task }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <button className="toggle-button">
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

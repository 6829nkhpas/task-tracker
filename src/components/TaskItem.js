import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleComplete = () => {
    onUpdateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    if (editTitle.trim().length > 100) {
      alert('Task title must be less than 100 characters');
      return;
    }

    onUpdateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength="100"
              className="edit-input"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              maxLength="500"
              rows="3"
              className="edit-textarea"
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-button">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <button onClick={handleToggleComplete} className="toggle-button">
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button onClick={handleStartEdit} className="edit-button">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

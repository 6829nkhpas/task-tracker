import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, searchQuery }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  // Function to highlight search terms
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="search-highlight">{part}</mark> : 
        part
    );
  };

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

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const confirmed = window.confirm('⚠️ Are you sure you want to delete this task?\n\nThis action cannot be undone.');
    if (confirmed) {
      onDeleteTask(task.id);
    }
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

  // Handle keyboard navigation in edit mode
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleSaveEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing" role="form" aria-label="Edit task">
        <div className="task-edit-form">
          <div className="form-group">
            <label htmlFor={`edit-title-${task.id}`}>Title *</label>
            <input
              id={`edit-title-${task.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength="100"
              className="edit-input"
              autoFocus
              aria-required="true"
              aria-describedby={`title-error-${task.id}`}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`edit-description-${task.id}`}>Description</label>
            <textarea
              id={`edit-description-${task.id}`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength="500"
              rows="3"
              className="edit-textarea"
              aria-describedby={`description-hint-${task.id}`}
            />
            <small id={`description-hint-${task.id}`} className="form-hint">
              Press Ctrl+Enter to save, Escape to cancel
            </small>
          </div>
          <div className="edit-actions">
            <button 
              onClick={handleSaveEdit} 
              className="save-button"
              aria-label="Save changes"
            >
              Save
            </button>
            <button 
              onClick={handleCancelEdit} 
              className="cancel-button"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : 'pending'}`}
      role="article"
      aria-labelledby={`task-title-${task.id}`}
      aria-describedby={`task-description-${task.id} task-meta-${task.id}`}
    >
      <div className="task-content">
        <div className="task-header">
          <h3 id={`task-title-${task.id}`} className="task-title">
            {highlightSearchTerm(task.title, searchQuery)}
          </h3>
          <span 
            className={`task-status ${task.completed ? 'completed' : 'pending'}`}
            aria-label={`Task status: ${task.completed ? 'Completed' : 'Pending'}`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        {task.description && (
          <p id={`task-description-${task.id}`} className="task-description">
            {highlightSearchTerm(task.description, searchQuery)}
          </p>
        )}
        
        <div id={`task-meta-${task.id}`} className="task-meta">
          <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>
      
      <div className="task-actions" role="group" aria-label="Task actions">
        <button 
          onClick={handleToggleComplete} 
          className="toggle-button"
          aria-label={`Mark task as ${task.completed ? 'pending' : 'completed'}`}
          title={`Mark task as ${task.completed ? 'pending' : 'completed'}`}
        >
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button 
          onClick={handleStartEdit} 
          className="edit-button"
          aria-label="Edit task"
          title="Edit task"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="delete-button"
          aria-label="Delete task"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

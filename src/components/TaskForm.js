import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Task title must be less than 100 characters';
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim()
      };

      onAddTask(taskData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setErrors({});
      
      // Show success message
      setSuccessMessage('✅ Task created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Error adding task:', error);
      setErrors({ submit: 'Failed to add task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: '' }));
    }
  };

  return (
    <div className="task-form-container">
      <h2>✨ Add New Task</h2>
      
      {successMessage && (
        <div className="success-message" role="alert">
          {successMessage}
        </div>
      )}
      
      {errors.submit && (
        <div className="error-message" role="alert">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="title">
            Title *
            <span className="sr-only">Required field</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter task title"
            maxLength="100"
            required
            disabled={isSubmitting}
            className={errors.title ? 'error' : ''}
            aria-describedby={errors.title ? 'title-error' : 'title-help'}
            aria-invalid={!!errors.title}
          />
          <div className="input-help">
            <small id="title-help" className="char-count">
              {title.length}/100 characters
            </small>
          </div>
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter task description (optional)"
            rows="3"
            maxLength="500"
            disabled={isSubmitting}
            className={errors.description ? 'error' : ''}
            aria-describedby={errors.description ? 'description-error' : 'description-help'}
            aria-invalid={!!errors.description}
          />
          <div className="input-help">
            <small id="description-help" className="char-count">
              {description.length}/500 characters
            </small>
          </div>
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="add-task-button"
          disabled={isSubmitting || !title.trim()}
          aria-describedby="submit-help"
        >
          {isSubmitting ? (
            <>
              <span className="sr-only">Adding task...</span>
              ⏳ Adding...
            </>
          ) : (
            <>
              ➕ Add Task
            </>
          )}
        </button>
        <small id="submit-help" className="form-help">
          Press Enter or click the button to add your task
        </small>
      </form>
    </div>
  );
};

export default TaskForm;

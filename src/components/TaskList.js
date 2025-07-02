import React from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  // Sample tasks for Phase 1 demonstration
  const sampleTasks = [
    {
      id: 1,
      title: "Complete React assignment",
      description: "Build a task tracker application",
      completed: false,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Review JavaScript concepts",
      description: "Go through ES6+ features",
      completed: true,
      createdAt: "2024-01-14T15:30:00Z"
    }
  ];

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      {sampleTasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one above!</p>
      ) : (
        <div className="task-list">
          {sampleTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

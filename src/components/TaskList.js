import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h2>Your Tasks</h2>
        <div className="no-tasks">
          <p>No tasks yet. Add one above!</p>
          <p>🚀 Start by creating your first task to get organized!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

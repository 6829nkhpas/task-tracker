import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, currentFilter, searchQuery }) => {
  const getEmptyStateMessage = () => {
    const hasSearch = searchQuery && searchQuery.trim().length > 0;
    const hasFilter = currentFilter !== 'all';

    if (hasSearch && hasFilter) {
      return {
        title: `No ${currentFilter} tasks found`,
        message: `No ${currentFilter} tasks match "${searchQuery}". Try adjusting your search or filter.`,
        emoji: '🔍'
      };
    } else if (hasSearch) {
      return {
        title: 'No tasks found',
        message: `No tasks match "${searchQuery}". Try a different search term.`,
        emoji: '🔍'
      };
    } else if (hasFilter) {
      const filterLabels = {
        pending: 'pending',
        completed: 'completed'
      };
      return {
        title: `No ${filterLabels[currentFilter]} tasks`,
        message: `You don't have any ${filterLabels[currentFilter]} tasks yet.`,
        emoji: currentFilter === 'completed' ? '🎉' : '📝'
      };
    } else {
      return {
        title: 'No tasks yet',
        message: 'Start by creating your first task to get organized!',
        emoji: '🚀'
      };
    }
  };

  const getListTitle = () => {
    const hasSearch = searchQuery && searchQuery.trim().length > 0;
    const hasFilter = currentFilter !== 'all';
    
    if (hasSearch && hasFilter) {
      const filterLabels = {
        pending: 'Pending',
        completed: 'Completed',
        all: 'All'
      };
      return `${filterLabels[currentFilter]} Tasks - Search Results (${tasks.length})`;
    } else if (hasSearch) {
      return `Search Results (${tasks.length})`;
    } else if (hasFilter) {
      const filterLabels = {
        pending: 'Pending Tasks',
        completed: 'Completed Tasks',
        all: 'All Tasks'
      };
      return `${filterLabels[currentFilter]} (${tasks.length})`;
    } else {
      return `Your Tasks (${tasks.length})`;
    }
  };

  if (!tasks || tasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div className="task-list-container">
        <h2>{getListTitle()}</h2>
        <div className="no-tasks">
          <div className="empty-state-icon">{emptyState.emoji}</div>
          <h3>{emptyState.title}</h3>
          <p>{emptyState.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>{getListTitle()}</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            searchQuery={searchQuery}
          />
        ))}
      </div>
      
      {(searchQuery || currentFilter !== 'all') && (
        <div className="list-footer">
          <p className="filter-info">
            {searchQuery && currentFilter !== 'all' 
              ? `Showing ${currentFilter} tasks matching "${searchQuery}"`
              : searchQuery 
                ? `Showing tasks matching "${searchQuery}"`
                : `Showing ${currentFilter} tasks`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;

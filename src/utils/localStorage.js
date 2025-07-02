// localStorage utility functions for task management

export const STORAGE_KEYS = {
  TASKS: 'taskTrackerTasks',
  USER: 'taskTrackerUser'
};

// Get tasks from localStorage
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Save tasks to localStorage
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    return false;
  }
};

// Add a new task
export const addTask = (taskData) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(), // Simple ID generation
    title: taskData.title,
    description: taskData.description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    ...taskData
  };
  
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return newTask;
};

// Update a task
export const updateTask = (taskId, updates) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks.find(task => task.id === taskId);
};

// Delete a task
export const deleteTask = (taskId) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
  return true;
};

// Clear all tasks
export const clearAllTasks = () => {
  localStorage.removeItem(STORAGE_KEYS.TASKS);
  return true;
};

// Sample tasks for demonstration (only added if no tasks exist)
export const initializeSampleTasks = () => {
  const existingTasks = getTasks();
  
  if (existingTasks.length === 0) {
    const sampleTasks = [
      {
        id: 1,
        title: "Complete React assignment",
        description: "Build a task tracker application with all required features",
        completed: false,
        createdAt: "2025-07-02T10:00:00Z"
      },
      {
        id: 2,
        title: "Review JavaScript concepts",
        description: "Go through ES6+ features and modern JavaScript practices",
        completed: true,
        createdAt: "2025-07-01T15:30:00Z"
      },
      {
        id: 3,
        title: "Setup development environment",
        description: "Install Node.js, VS Code extensions, and configure Git",
        completed: true,
        createdAt: "2025-06-30T09:15:00Z"
      }
    ];
    
    saveTasks(sampleTasks);
    return sampleTasks;
  }
  
  return existingTasks;
};

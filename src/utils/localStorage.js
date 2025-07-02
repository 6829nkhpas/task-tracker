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

// localStorage utility functions for task management (per-user)

export const STORAGE_KEYS = {
  USER: "taskTrackerUser",
};

// Get the per-user key for tasks
const getUserTasksKey = (username) => `taskTrackerTasks_${username}`;

// Get tasks from localStorage for a user
export const getTasks = (username) => {
  try {
    const key = getUserTasksKey(username);
    const tasks = localStorage.getItem(key);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

// Save tasks to localStorage for a user
export const saveTasks = (username, tasks) => {
  try {
    const key = getUserTasksKey(username);
    localStorage.setItem(key, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
    return false;
  }
};

// Add a new task for a user
export const addTask = (username, taskData) => {
  const tasks = getTasks(username);
  const newTask = {
    id: Date.now(), // Simple ID generation
    title: taskData.title,
    description: taskData.description || "",
    completed: false,
    createdAt: new Date().toISOString(),
    ...taskData,
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(username, updatedTasks);
  return newTask;
};

// Update a task for a user
export const updateTask = (username, taskId, updates) => {
  const tasks = getTasks(username);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks(username, updatedTasks);
  return updatedTasks.find((task) => task.id === taskId);
};

// Delete a task for a user
export const deleteTask = (username, taskId) => {
  const tasks = getTasks(username);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(username, updatedTasks);
  return true;
};

// Clear all tasks for a user
export const clearAllTasks = (username) => {
  const key = getUserTasksKey(username);
  localStorage.removeItem(key);
  return true;
};

// Sample tasks for demonstration (only added if no tasks exist for user)
export const initializeSampleTasks = (username) => {
  const existingTasks = getTasks(username);
  if (existingTasks.length === 0) {
    const sampleTasks = [
      {
        id: 1,
        title: "Complete React assignment",
        description:
          "Build a task tracker application with all required features",
        completed: false,
        createdAt: "2025-07-02T10:00:00Z",
      },
      {
        id: 2,
        title: "Review JavaScript concepts",
        description: "Go through ES6+ features and modern JavaScript practices",
        completed: true,
        createdAt: "2025-07-01T15:30:00Z",
      },
      {
        id: 3,
        title: "Setup development environment",
        description: "Install Node.js, VS Code extensions, and configure Git",
        completed: true,
        createdAt: "2025-06-30T09:15:00Z",
      },
    ];
    saveTasks(username, sampleTasks);
    return sampleTasks;
  }
  return existingTasks;
};

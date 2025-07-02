import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';
import { addTask, updateTask, deleteTask, initializeSampleTasks } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('taskTrackerUser');
    if (storedUser) {
      setUser(storedUser);
    }
    
    // Load tasks from localStorage (with sample data if none exist)
    const storedTasks = initializeSampleTasks();
    setTasks(storedTasks);
    
    setIsLoading(false);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('taskTrackerUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('taskTrackerUser');
    setUser(null);
    // Reset filters when logging out
    setCurrentFilter('all');
    setSearchQuery('');
  };

  const handleAddTask = (taskData) => {
    const newTask = addTask(taskData);
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const handleUpdateTask = (taskId, updates) => {
    const updatedTask = updateTask(taskId, updates);
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? updatedTask : task
    ));
    return updatedTask;
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      return true;
    }
    return false;
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Filter and search logic
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Apply filter
    switch (currentFilter) {
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      case 'pending':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'all':
      default:
        // No filtering needed
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return filteredTasks;
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TaskDashboard 
          user={user} 
          onLogout={handleLogout}
          tasks={tasks}
          filteredTasks={getFilteredTasks()}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
}

export default App;

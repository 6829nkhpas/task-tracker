import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskDashboard";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  addTask,
  updateTask,
  deleteTask,
  initializeSampleTasks,
} from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Keyboard shortcut handlers
  const focusSearch = () => {
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.focus();
    }
  };

  const openExportMenu = () => {
    const exportButton = document.querySelector(".dropdown-trigger");
    if (exportButton) {
      exportButton.click();
    }
  };

  const addTaskFocus = () => {
    const titleInput = document.querySelector('input[placeholder*="title"]');
    if (titleInput) {
      titleInput.focus();
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("taskTrackerUser");
    if (storedUser) {
      setUser(storedUser);
      // Load tasks for this user
      const storedTasks = initializeSampleTasks(storedUser);
      setTasks(storedTasks);
    }
    // Load theme preference
    const savedTheme = localStorage.getItem("taskTrackerTheme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
    setIsLoading(false);
  }, []);

  // When user changes (login/logout), load their tasks
  useEffect(() => {
    if (user) {
      const userTasks = initializeSampleTasks(user);
      setTasks(userTasks);
    } else {
      setTasks([]);
    }
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleLogin = (username) => {
    localStorage.setItem("taskTrackerUser", username);
    setUser(username);
    // Load tasks for this user
    const userTasks = initializeSampleTasks(username);
    setTasks(userTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem("taskTrackerUser");
    setUser(null);
    // Reset filters when logging out
    setCurrentFilter("all");
    setSearchQuery("");
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("taskTrackerTheme", newTheme ? "dark" : "light");
  };

  const handleImportTasks = (importedTasks) => {
    // Replace current tasks with imported tasks
    setTasks(importedTasks);
    // Save to localStorage for this user
    if (user) {
      localStorage.setItem(
        `taskTrackerTasks_${user}`,
        JSON.stringify(importedTasks)
      );
    }
  };

  const handleAddTask = (taskData) => {
    if (!user) return null;
    const newTask = addTask(user, taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  const handleUpdateTask = (taskId, updates) => {
    if (!user) return null;
    const updatedTask = updateTask(user, taskId, updates);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
    return updatedTask;
  };

  const handleDeleteTask = (taskId) => {
    if (!user) return false;
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(user, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
      case "completed":
        filteredTasks = filteredTasks.filter((task) => task.completed);
        break;
      case "pending":
        filteredTasks = filteredTasks.filter((task) => !task.completed);
        break;
      case "all":
      default:
        // No filtering needed
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    return filteredTasks;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your tasks...</div>
      </div>
    );
  }
  return (
    <ErrorBoundary>
      <div className="App">
        {/* Keyboard shortcuts handler */}
        <KeyboardShortcuts
          onAddTask={addTaskFocus}
          onToggleTheme={handleThemeToggle}
          onFocusSearch={focusSearch}
          onOpenExport={openExportMenu}
        />

        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div id="main-content">
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
              isDarkMode={isDarkMode}
              onImportTasks={handleImportTasks}
              onThemeToggle={handleThemeToggle}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

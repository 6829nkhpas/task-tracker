import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('taskTrackerUser');
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('taskTrackerUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('taskTrackerUser');
    setUser(null);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TaskDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

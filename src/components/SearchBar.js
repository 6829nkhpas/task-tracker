import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchQuery, onSearchChange, totalTasks, filteredCount }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce search input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, onSearchChange]);

  // Sync with external searchQuery changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <div className="search-container">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="search-input"
      />
      {hasActiveSearch && (
        <button 
          onClick={handleClear}
          className="clear-search-button"
          title="Clear search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      {hasActiveSearch && (
        <div className="search-stats">
          📊 {filteredCount} of {totalTasks} tasks found
        </div>
      )}
    </div>
  );
};

export default SearchBar;

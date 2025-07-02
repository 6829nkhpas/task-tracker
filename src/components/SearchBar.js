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
    <div className="search-bar-container">
      <div className="search-bar-header">
        <h2>Search Tasks</h2>
        {hasActiveSearch && (
          <span className="search-results">
            {filteredCount} of {totalTasks} tasks match your search
          </span>
        )}
      </div>
      
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="search-input"
          />
          <div className="search-input-icons">
            {hasActiveSearch ? (
              <button 
                onClick={handleClear}
                className="clear-search-button"
                title="Clear search"
              >
                ✕
              </button>
            ) : (
              <span className="search-icon">🔍</span>
            )}
          </div>
        </div>
        
        {hasActiveSearch && (
          <div className="search-info">
            <span className="search-query">Searching for: "{searchQuery}"</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

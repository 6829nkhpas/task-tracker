import React, { useState, useRef } from 'react';
import { exportTasks, importTasks, exportTasksAsCSV, createBackup, restoreFromBackup } from '../utils/exportImport';

const ExportImport = ({ tasks = [], onImportTasks }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '', show: false });
  const fileInputRef = useRef(null);

  const showFeedback = (message, type = 'success') => {
    setFeedback({ message, type, show: true });
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleExportJSON = () => {
    try {
      const result = exportTasks(tasks, 'my-tasks');
      showFeedback(result.message, result.success ? 'success' : 'error');
    } catch (error) {
      showFeedback('Export failed: ' + error.message, 'error');
    }
    setIsDropdownOpen(false);
  };

  const handleExportCSV = () => {
    try {
      const result = exportTasksAsCSV(tasks, 'my-tasks');
      showFeedback(result.message, result.success ? 'success' : 'error');
    } catch (error) {
      showFeedback('Export failed: ' + error.message, 'error');
    }
    setIsDropdownOpen(false);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsDropdownOpen(false);
  };

  const handleFileImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await importTasks(file);
      if (result.success && onImportTasks) {
        onImportTasks(result.data);
        showFeedback(result.message, 'success');
      }
    } catch (error) {
      showFeedback(error.message, 'error');
    }

    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleCreateBackup = () => {
    try {
      const result = createBackup(tasks);
      showFeedback(result.message, result.success ? 'success' : 'error');
    } catch (error) {
      showFeedback('Backup failed: ' + error.message, 'error');
    }
    setIsDropdownOpen(false);
  };

  const handleRestoreBackup = () => {
    try {
      const result = restoreFromBackup();
      if (result.success && onImportTasks) {
        onImportTasks(result.data);
        showFeedback(result.message, 'success');
      } else {
        showFeedback(result.message, 'error');
      }
    } catch (error) {
      showFeedback('Restore failed: ' + error.message, 'error');
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="export-import-container">
      <div className="dropdown">
        <button
          className="dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          title="Export/Import tasks"
        >
          <span>⚙️</span>
          <span className="dropdown-text">Data</span>
          <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu" role="menu">
            <button
              className="dropdown-item"
              onClick={handleExportJSON}
              role="menuitem"
              disabled={tasks.length === 0}
            >
              <span>📁</span>
              Export as JSON
            </button>
            
            <button
              className="dropdown-item"
              onClick={handleExportCSV}
              role="menuitem"
              disabled={tasks.length === 0}
            >
              <span>📊</span>
              Export as CSV
            </button>
            
            <hr className="dropdown-divider" />
            
            <button
              className="dropdown-item"
              onClick={handleImportClick}
              role="menuitem"
            >
              <span>📂</span>
              Import JSON
            </button>
            
            <hr className="dropdown-divider" />
            
            <button
              className="dropdown-item"
              onClick={handleCreateBackup}
              role="menuitem"
              disabled={tasks.length === 0}
            >
              <span>💾</span>
              Create Backup
            </button>
            
            <button
              className="dropdown-item"
              onClick={handleRestoreBackup}
              role="menuitem"
            >
              <span>🔄</span>
              Restore Backup
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        style={{ display: 'none' }}
        aria-label="Import tasks file"
      />

      {/* Feedback toast */}
      {feedback.show && (
        <div className={`feedback-toast ${feedback.type}`} role="alert">
          <span className="feedback-icon">
            {feedback.type === 'success' ? '✅' : '❌'}
          </span>
          <span className="feedback-message">{feedback.message}</span>
        </div>
      )}

      {/* Click outside handler */}
      {isDropdownOpen && (
        <div 
          className="dropdown-overlay"
          onClick={() => setIsDropdownOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ExportImport;

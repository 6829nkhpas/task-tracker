// Export/Import utility functions
export const exportTasks = (tasks, filename = 'tasks') => {
  try {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return { success: true, message: 'Tasks exported successfully!' };
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, message: 'Failed to export tasks. Please try again.' };
  }
};

export const importTasks = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    if (file.type !== 'application/json') {
      reject(new Error('Please select a valid JSON file'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate the imported data structure
        if (!Array.isArray(importedData)) {
          reject(new Error('Invalid file format: Expected an array of tasks'));
          return;
        }

        // Validate each task object
        const validatedTasks = importedData.map((task, index) => {
          if (!task.id || !task.title) {
            throw new Error(`Invalid task at position ${index + 1}: Missing required fields`);
          }
          
          return {
            id: task.id,
            title: task.title,
            description: task.description || '',
            completed: Boolean(task.completed),
            createdAt: task.createdAt || new Date().toISOString(),
            updatedAt: task.updatedAt || new Date().toISOString()
          };
        });

        resolve({
          success: true,
          data: validatedTasks,
          message: `Successfully imported ${validatedTasks.length} tasks!`
        });
      } catch (error) {
        reject(new Error(`Failed to parse file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const exportTasksAsCSV = (tasks, filename = 'tasks') => {
  try {
    const headers = ['Title', 'Description', 'Status', 'Created At', 'Updated At'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [
        `"${task.title.replace(/"/g, '""')}"`,
        `"${task.description.replace(/"/g, '""')}"`,
        task.completed ? 'Completed' : 'Pending',
        new Date(task.createdAt).toLocaleDateString(),
        new Date(task.updatedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const exportFileDefaultName = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return { success: true, message: 'Tasks exported as CSV successfully!' };
  } catch (error) {
    console.error('CSV Export error:', error);
    return { success: false, message: 'Failed to export tasks as CSV. Please try again.' };
  }
};

// Backup and restore functions
export const createBackup = (tasks) => {
  const backup = {
    tasks: tasks,
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
  
  localStorage.setItem('taskTrackerBackup', JSON.stringify(backup));
  return { success: true, message: 'Backup created successfully!' };
};

export const restoreFromBackup = () => {
  try {
    const backup = localStorage.getItem('taskTrackerBackup');
    if (!backup) {
      return { success: false, message: 'No backup found' };
    }
    
    const backupData = JSON.parse(backup);
    return {
      success: true,
      data: backupData.tasks,
      message: `Backup restored from ${new Date(backupData.exportDate).toLocaleDateString()}`
    };
  } catch (error) {
    console.error('Restore error:', error);
    return { success: false, message: 'Failed to restore backup' };
  }
};

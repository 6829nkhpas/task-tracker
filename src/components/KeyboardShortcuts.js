import { useEffect } from 'react';

const KeyboardShortcuts = ({ onAddTask, onToggleTheme, onFocusSearch, onOpenExport }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if user is typing in an input/textarea
      const activeElement = document.activeElement;
      const isInputActive = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      );

      // Don't trigger shortcuts when typing in inputs (except for Escape)
      if (isInputActive && event.key !== 'Escape') {
        return;
      }

      // Handle keyboard shortcuts
      switch (event.key) {
        case 'n':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onAddTask();
          }
          break;
        
        case 't':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleTheme();
          }
          break;
        
        case 'f':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onFocusSearch();
          }
          break;
        
        case 'e':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onOpenExport();
          }
          break;
        
        case 'Escape':
          // Close any open dropdowns or modals
          const dropdowns = document.querySelectorAll('.dropdown-menu');
          dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
          });
          
          // Blur active element
          if (activeElement) {
            activeElement.blur();
          }
          break;
        
        case '?':
          if (event.shiftKey) {
            event.preventDefault();
            showShortcutsHelp();
          }
          break;
        
        default:
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAddTask, onToggleTheme, onFocusSearch, onOpenExport]);

  const showShortcutsHelp = () => {
    const shortcuts = [
      { key: 'Ctrl/Cmd + N', action: 'Add new task' },
      { key: 'Ctrl/Cmd + T', action: 'Toggle theme' },
      { key: 'Ctrl/Cmd + F', action: 'Focus search' },
      { key: 'Ctrl/Cmd + E', action: 'Open export menu' },
      { key: 'Escape', action: 'Close menus/blur input' },
      { key: 'Shift + ?', action: 'Show this help' }
    ];

    const helpText = shortcuts
      .map(shortcut => `${shortcut.key}: ${shortcut.action}`)
      .join('\n');

    alert(`Keyboard Shortcuts:\n\n${helpText}`);
  };

  // This component doesn't render anything
  return null;
};

export default KeyboardShortcuts;

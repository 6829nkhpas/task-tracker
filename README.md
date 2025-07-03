# Personal Task Tracker

## 📖 Description
A simple and intuitive personal task management application built with React. This app allows users to create, manage, and track their daily tasks with a clean and responsive interface.

## 🚀 Features

### Phase 1 (Completed ✅)
- ✅ Project setup with React
- ✅ Component architecture
- ✅ Basic login functionality with localStorage
- ✅ Responsive layout structure
- ✅ Component skeletons for all major features

### Phase 2 (Completed ✅)
- ✅ Add new tasks with title and description
- ✅ Display tasks with creation date and status
- ✅ Edit tasks inline with form validation
- ✅ Delete tasks with confirmation dialog
- ✅ Toggle task completion status
- ✅ Real-time task count and progress tracking
- ✅ Data persistence with localStorage
- ✅ Form validation and error handling
- ✅ Sample tasks for demonstration

### Phase 3 (Completed ✅)
- ✅ Advanced filtering (All/Completed/Pending) with real-time updates
- ✅ Search functionality with debounced input
- ✅ Search term highlighting in task titles and descriptions
- ✅ Dynamic task counts and progress tracking
- ✅ Visual progress bar for task completion
- ✅ Enhanced empty states with contextual messages
- ✅ Clear search and filter reset functionality
- ✅ Responsive filter and search layout

### Phase 4 (Completed ✅)
- ✅ Dark/Light theme toggle with persistent preference
- ✅ Comprehensive CSS animations and micro-interactions
- ✅ Enhanced keyboard accessibility and shortcuts
- ✅ Export/Import functionality (JSON and CSV formats)
- ✅ Local backup and restore capabilities
- ✅ ARIA attributes and screen reader support
- ✅ Skip-to-content navigation
- ✅ Focus management and visual indicators
- ✅ High contrast and reduced motion support
- ✅ Form validation with user feedback
- ✅ Responsive design optimizations
- ✅ Performance improvements with CSS containment

## 🛠 Setup Instructions

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧰 Technologies Used
- React.js (Functional Components with Hooks)
- CSS3 (Custom styling with responsive design)
- localStorage (Data persistence)
- JavaScript ES6+

## 📁 Project Structure
```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── TaskDashboard.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   ├── TaskList.js
│   │   └── TaskFilter.js
│   ├── utils/
│   │   └── localStorage.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── README.md
└── package.json
```

## 🔗 Live Demo
[Link to be added after deployment]

## 🖼 Screenshots
[Screenshots to be added after UI completion]

## 📋 Development Phases

This project is being developed in four distinct phases to maintain clean git commit history:

1. **Phase 1**: Project Setup & Basic Login ✅
2. **Phase 2**: Core Task Management (Add, Edit, Delete, Toggle) ✅
3. **Phase 3**: Advanced Filtering & Search Features ✅
4. **Phase 4**: UI/UX Polish & Final Enhancements

## 🧪 Getting Started for Development

The application now includes comprehensive task management features:

- **Login**: Any username with at least 2 characters
- **Sample Data**: Automatically loads sample tasks for demonstration
- **Search**: Real-time search across task titles and descriptions with highlighting
- **Filtering**: Filter by All, Pending, or Completed tasks
- **Progress Tracking**: Visual progress bar and completion statistics
- **Task Management**: Create, edit, delete, and toggle task completion
- **Data Persistence**: All changes automatically saved to localStorage
- **Export/Import**: Export tasks as JSON or CSV, import from JSON files
- **Dark Mode**: Toggle between light and dark themes
- **Keyboard Shortcuts**: Navigate efficiently with keyboard shortcuts

### ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + N**: Focus on new task input
- **Ctrl/Cmd + F**: Focus on search input
- **Ctrl/Cmd + T**: Toggle dark/light theme
- **Ctrl/Cmd + E**: Open export/import menu
- **Escape**: Close menus or cancel editing
- **Ctrl/Cmd + Enter** (in edit mode): Save changes
- **Shift + ?**: Show keyboard shortcuts help

### 🌙 Theme Support

The app supports both light and dark themes with:
- Automatic system preference detection
- Manual toggle with persistent storage
- Smooth transitions and proper contrast ratios
- Accessibility-compliant color schemes

---

Built with ❤️ using React.js

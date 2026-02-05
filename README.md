# Project To-Do List: Academic Task Planner

This project is a functional, browser-based To-Do List application designed specifically as an academic task planner. It allows users to organize their projects and assignments with due dates and priority levels using a clean, modern interface.

## 🌟 Key Features

* **Task Management**:
    * **Create**: Add tasks with specific titles, due dates, and priority levels (Low, Medium, High).
    * **Edit**: Modify existing tasks by clicking the "Edit" button or double-clicking the task text to enter inline editing mode.
    * **Delete**: Remove individual tasks or clear all completed tasks at once.
    * **Toggle**: Mark tasks as "Done" to strike them through and update their status.
* **Priority System**: Tasks are visually categorized by a color-coded sidebar based on priority:
    * 🔴 **High**: Red
    * 🟡 **Medium**: Yellow
    * ⚪ **Low**: Gray
* **Smart Filtering**: Quickly toggle between "All," "Active," and "Completed" views to focus on relevant work.
* **Dynamic Counts**: Real-time tracking of total, active, and completed task counts.
* **Persistence**: Uses `localStorage` to ensure your task list is saved even after refreshing the browser or closing the tab.

## 🛠️ Technology Stack

* **Frontend**: HTML5 and CSS3 (featuring flexbox layouts and custom categorization styles).
* **Logic**: Vanilla JavaScript for DOM manipulation, event handling, and state management.
* **Storage**: Browser `localStorage` API for data persistence.

## 📁 Project Structure

* `index.html`: Defines the application structure, including the input row, filter controls, and the task list container.
* `styles.css`: Contains the responsive design, typography, and priority-based visual indicators.
* `script.js`: Manages the application logic, including task filtering, unique ID generation (`uid`), and local storage synchronization.

## 🚀 Getting Started

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/bhumikab01/to-do-list.git
    ```
2.  **Run the Application**:
    * Open `index.html` in any web browser to start managing your academic tasks immediately. No server or installation is required.

## 📝 Usage
* **Adding a Task**: Type your project name, select a deadline and priority, then press "Enter" or click "Add".
* **Editing**: Double-click any task description to quickly update the text, date, or priority level inline.
* **Cleanup**: Use the "Clear Completed" button to remove finished assignments and keep your workspace tidy.

* **Adding a Task**: Type your project name, select a deadline and priority, then press "Enter" or click "Add".
* **Editing**: Double-click any task description to quickly update the text, date, or priority level inline.
* **Cleanup**: Use the "Clear Completed" button to remove finished assignments and keep your workspace tidy.

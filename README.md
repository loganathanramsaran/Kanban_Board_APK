# 🧠 Kanban Task Management App

A sleek, responsive Kanban board built with **React**, **Tailwind CSS**, and **react-beautiful-dnd**. Manage your tasks visually across columns, mark favorites, trash unwanted tasks, and enjoy light/dark themes!

---

## 🚀 Features

- 📋 Create, edit, and delete tasks
- 📌 Mark tasks as **Favorites**
- 🗑️ Move tasks to **Trash**, restore or permanently delete them
- 🌗 Toggle between **Light/Dark mode**
- 🔀 Drag-and-drop tasks between columns
- 💾 Data persistence with **localStorage**
- 📱 Fully responsive & mobile-friendly

---

## 🛠️ Tech Stack

- **React** with Hooks
- **Tailwind CSS**
- **react-beautiful-dnd**
- **lucide-react** icons
- LocalStorage for persistence

---

## 📦 Installation

```bash
git clone https://github.com/loganathanramsaran/Kanban_Board_APK.git
cd kanban-board
npm install
npm run dev  # or npm start
```
---
##📁 Folder Structure
```
kanban-board/
├── public/
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── TaskForm.jsx
│   │   ├── Favorites.jsx
│   │   ├── Trash.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── index.html
```
| Light Mode                             | Dark Mode                            |
| -------------------------------------- | ------------------------------------ |
| ![light-mode](/screenshots/light.png) | ![dark-mode](/screenshots/dark.png) |

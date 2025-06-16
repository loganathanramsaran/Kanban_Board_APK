import { useEffect, useState } from "react";
import { Sun, Moon, LayoutDashboard } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import Favorites from "./components/Favorites";
import Trash from "./components/Trash";

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [view, setView] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem("kanban-data");
    return stored
      ? JSON.parse(stored)
      : [
          { id: "todo", title: "To Do", tasks: [] },
          { id: "inprogress", title: "In Progress", tasks: [] },
          { id: "done", title: "Done", tasks: [] },
        ];
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const handleSidebarSelect = (viewName) => {
    setView(viewName);
    setSidebarOpen(false); // Auto-close sidebar on mobile
  };

  const updateTask = (taskId, updater) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === taskId ? updater(task) : task
        ),
      }))
    );
  };

  const toggleFavorite = (taskId) => {
    updateTask(taskId, (task) => ({ ...task, favorite: !task.favorite }));
  };

  const moveToTrash = (taskId) => {
    updateTask(taskId, (task) => ({ ...task, trashed: true }));
  };

  const restoreTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, trashed: false } : task
              ),
            }
          : col
      )
    );
  };

  const PermanentDelete = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== taskId),
            }
          : col
      )
    );
  };

  const renderView = () => {
    if (view === "favorites") {
      return <Favorites data={columns} onToggleFavorite={toggleFavorite} />;
    }
    if (view === "trash") {
      return (
        <Trash
          data={columns}
          onRestore={restoreTask}
          onDelete={PermanentDelete}
        />
      );
    }
    return (
      <Board
        columns={columns}
        setColumns={setColumns}
        onToggleFavorite={toggleFavorite}
        onTrash={moveToTrash}
      />
    );
  };

  return (
    <div className="min-h-screen bg-mint-light dark:bg-gray-900 transition-colors duration-300">
      <header className="flex justify-between items-center px-4 py-4 shadow-md bg-emerald-400 dark:bg-gray-800">
        <div className="flex items-center gap-2 text-gray-800 dark:text-white">
          <LayoutDashboard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-2xl font-bold">Kanban Board</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle Dark Mode"
          >
            {dark ? (
              <Sun className="text-yellow-300" />
            ) : (
              <Moon className="text-gray-700" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        <Sidebar
          onSelect={handleSidebarSelect}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <main className="min-h-[480px] p-6 w-full">{renderView()}</main>
      </div>

      <footer className="bg-emerald-400 text-center dark:bg-gray-900 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Kanban Board
      </footer>
    </div>
  );
}

export default App;

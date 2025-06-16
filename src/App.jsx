// App.jsx
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Sidebar from "./components/Sidebar";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const handleSidebarSelect = (viewName) => {
    setView(viewName);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-mint-light dark:bg-gray-900 transition-colors duration-300">
      <header className="flex justify-around lg:justify-between items-center px-4 py-4 shadow-md bg-emerald-400
       dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kanban Board</h1>
        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded-full hover:bg-mint-accent dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {dark ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-700" />}
        </button>
      </header>
      <div className="flex">
        <Sidebar onSelect={handleSidebarSelect} />
        <main className="min-h-[480px] p-6 w-full">
          <Board />
        </main>
      </div>
      <footer className="bg-emerald-400 text-center dark:bg-gray-900 dark:text-gray-400 py-4 border-t
       border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Kanban Board
      </footer>
    </div>
  );
}

export default App;

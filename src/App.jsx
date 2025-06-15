import Board from "./components/Board";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex justify-between items-center px-6 py-4 shadow dark:shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Kanban Board
        </h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
        </button>
      </header>

      <main>
        <Board />
      </main>
    </div>
  );
}

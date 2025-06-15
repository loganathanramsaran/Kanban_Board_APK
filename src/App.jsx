// App.jsx
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="flex justify-between items-center px-4 py-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kanban Board</h1>
        <button
          onClick={() => setDark((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Toggle Dark Mode"
        >
          {dark ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-700" />}
        </button>
      </header>
      <main className="p-4">
        <Board />
      </main>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Menu, X, ListTodo, Star, Trash2 } from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="relative z-50">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-2 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full 
        shadow-md transition lg:hidden"
        aria-label="Toggle sidebar"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-[480px] w-64 bg-emerald-100 dark:bg-gray-900 text-gray-900
             dark:text-white shadow-lg transform transition-transform duration-300 ease-in-out 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block`}
      >
        {/* Sidebar Header */}
        <div className="p-6 font-bold max-md:text-center max-lg:text-center text-lg border-b border-emerald-200
         dark:border-gray-700">
          Task Manager
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex flex-col gap-3">
          <button
            onClick={() => onSelect("all")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-emerald-200 dark:hover:bg-emerald-800 
            transition"
          >
            <ListTodo size={18} />
            All Tasks
          </button>
          <button
            onClick={() => onSelect("favorites")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-800
             transition"
          >
            <Star size={18} />
            Favorites
          </button>
          <button
            onClick={() => onSelect("trash")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition"
          >
            <Trash2 size={18} />
            Trash
          </button>
        </nav>
      </aside>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Menu, X, ListTodo, Star, Trash2 } from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setOpen((prev) => !prev);

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (view) => {
    onSelect(view);
    setOpen(false);
  };

  return (
    <div className="sidebar">
      <button
        onClick={toggleSidebar}
        className=" z-20 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg 
        shadow-md transition lg:hidden ml-2 mt-4 fixed lg:static"
        aria-label="Toggle sidebar"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 min-h-screen w-52 bg-emerald-100 dark:bg-gray-900 text-gray-900
            dark:text-white shadow-lg transform transition-transform duration-300 ease-in-out 
            z-50 ${open ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0 lg:static lg:block`}
      >
        {/* Header */}
        <div className="p-4 font-bold text-lg border-b border-emerald-200 dark:border-gray-700 ">
          Task Manager
        </div>

        {/* Nav Buttons */}
        <nav className="p-4 flex flex-col gap-3">
          <button
            onClick={() => handleSelect("all")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-emerald-200 dark:hover:bg-emerald-800 transition"
          >
            <ListTodo size={18} />
            All Tasks
          </button>
          <button
            onClick={() => handleSelect("favorites")}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-800 transition"
          >
            <Star size={18} />
            Favorites
          </button>
          <button
            onClick={() => handleSelect("trash")}
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

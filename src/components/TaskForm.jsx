import { useState } from "react";

export default function TaskForm({ columns, onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(columns[0]?.id || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(status, {
      title,
      description,
      tags: [],
      priority : "low",
    });

    setTitle("");
    setDescription("");
    setStatus(columns[0]?.id || "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-emerald-100 dark:bg-gray-800 p-3 w-3/4 max-md:w-full mx-auto rounded-lg shadow mb-6 border border-gray-300 dark:border-gray-700"
    >
      <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-3">Create New Task</h2>
      <div className="space-y-2 flex flex-col items-center">
        <input
          className="w-3/4 p-1 border rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-3/4 p-1 border rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          className="w-3/4 p-1 border rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {columns.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

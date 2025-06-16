// AllTasks.jsx
export default function AllTasks({ columns }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">All Tasks</h2>
      <ul className="space-y-3">
        {columns.flatMap((col) =>
          col.tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow text-gray-800 dark:text-white"
            >
              {task.text} <span className="text-sm text-gray-500">[{col.title}]</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

import { Trash2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function Trash({ data, onRestore, onDelete }) {
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    const trashed = [];
    data.forEach((col) => {
      col.tasks.forEach((task) => {
        if (task.trashed) {
          trashed.push({ ...task, columnId: col.id, columnTitle: col.title });
        }
      });
    });
    setTrash(trashed);
  }, [data]);

  if (trash.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        Trash is empty.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🗑️ Trashed Tasks</h2>
      <div className="space-y-3">
        {trash.map((task) => (
          <div
            key={task.id}
            className="bg-red-100 dark:bg-gray-800 p-3 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {task.text}
              </p>
              <small className="text-xs text-gray-500">
                From: {task.columnTitle}
              </small>
            </div>

            <div className="flex gap-2">
              {/* Restore Button */}
              <button
                onClick={() => onRestore(task.columnId, task.id)}
                title="Restore Task"
                className="text-green-500 hover:text-green-600"
              >
                <RotateCcw />
              </button>

              {/* Permanent Delete Button */}
              <button
                onClick={() => onDelete(task.columnId, task.id)}
                title="Delete Permanently"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

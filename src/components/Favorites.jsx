import { StarOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function Favorites({ data, onToggleFavorite }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = [];
    data.forEach((col) => {
      col.tasks.forEach((task) => {
        if (task.favorite) {
          favs.push({ ...task, columnId: col.id, columnTitle: col.title });
        }
      });
    });
    setFavorites(favs);
  }, [data]);

  if (favorites.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        No favorite tasks found.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">⭐ Favorite Tasks</h2>
      <div className="space-y-3">
        {favorites.map((task) => (
          <div
            key={task.id}
            className="bg-yellow-50 dark:bg-gray-800 p-3 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {task.title}
              </p>
              <small className="text-xs text-gray-500">
                From: {task.columnTitle}
              </small>
            </div>
            <button
              onClick={() => onToggleFavorite(task.columnId, task.id)}
              title="Remove from favorites"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <StarOff />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

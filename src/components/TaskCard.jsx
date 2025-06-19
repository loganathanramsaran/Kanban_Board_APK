import { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Check,
  X,
  Star,
  StarOff,
  RotateCcw,
} from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({
  task,
  index,
  onDelete,
  onEdit,
  onToggleFavorite,
  onTrash,
  onRestore,
  isTrashView,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title || "",
    description: task.description || "",
    tags: task.tags?.join(", ") || "",
    priority: task.priority || "Low",
  });

  useEffect(() => {
    setEditedTask({
      title: task.title || "",
      description: task.description || "",
      tags: task.tags?.join(", ") || "",
      priority: task.priority || "Low",
    });
  }, [task]);

  const handleSave = () => {
    if (editedTask.title.trim()) {
      onEdit({
        title: editedTask.title.trim(),
        description: editedTask.description.trim(),
        tags: editedTask.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        priority: editedTask.priority,
      });
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex flex-col w-3/4 mx-auto gap-1 py-1 px-2 rounded-lg shadow-md border transition-all duration-300 
            ${
              snapshot.isDragging
                ? "bg-emerald-100 dark:bg-emerald-800 scale-[1.03]"
                : "bg-white dark:bg-gray-800 border-emerald-200 dark:border-gray-700"
            }`}
        >
          {isEditing ? (
            <>
              <input
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Title"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <textarea
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Description"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
              <input
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Tags (comma-separated)"
                value={editedTask.tags}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, tags: e.target.value })
                }
              />
              <select
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="flex justify-end gap-2 pt-1">
                <button onClick={handleSave} title="Save">
                  <Check className="w-4 h-4 text-green-600 hover:text-green-700" />
                </button>
                <button onClick={() => setIsEditing(false)} title="Cancel">
                  <X className="w-4 h-4 text-gray-500 hover:text-gray-600" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h3
                  onDoubleClick={() => setIsEditing(true)}
                  className=" font-medium text-green-600 dark:text-gray-100 break-words flex-1 cursor-pointer"
                >
                  {task.title}
                </h3>
                {!isTrashView && onToggleFavorite && (
                  <button onClick={onToggleFavorite} title="Favorite">
                    {task.favorite ? (
                      <Star className="w-4 h-4 text-yellow-400 hover:text-yellow-500" />
                    ) : (
                      <StarOff className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                    )}
                  </button>
                )}
              </div>

              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1 text-xs">
                {task.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-full dark:bg-emerald-700 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={`px-3 py-0.5 rounded-xl text-white ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                {isTrashView ? (
                  <>
                    <button onClick={onRestore} title="Restore">
                      <RotateCcw className="w-4 h-4 text-green-600 hover:text-green-700" />
                    </button>
                    <button onClick={onDelete} title="Delete Permanently">
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={onTrash} title="Move to Trash">
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                    <button onClick={() => setIsEditing(true)} title="Edit">
                      <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

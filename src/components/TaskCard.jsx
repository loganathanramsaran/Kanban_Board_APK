import { useState, useEffect } from "react";
import { Pencil, Trash2, Check, X, Star, StarOff, RotateCcw } from "lucide-react";
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
  const [newText, setNewText] = useState(task.text);

  useEffect(() => {
    setNewText(task.text);
  }, [task.text]);

  const handleEdit = () => {
    if (newText.trim()) {
      onEdit(newText);
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
          className={`flex items-center justify-between gap-2 p-2 rounded-lg shadow-md border transition-all duration-300 
            ${
              snapshot.isDragging
                ? "bg-emerald-100 dark:bg-emerald-800 scale-[1.03]"
                : "bg-white dark:bg-gray-800 border-emerald-200 dark:border-gray-700"
            }`}
        >
          {isEditing ? (
            <>
              <input
                className="flex-1 px-2 py-1 text-sm rounded border border-emerald-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEdit();
                  if (e.key === "Escape") {
                    setIsEditing(false);
                    setNewText(task.text);
                  }
                }}
              />
              <button onClick={handleEdit} title="Save">
                <Check className="w-4 h-4 text-green-600 hover:text-green-700" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText(task.text);
                }}
                title="Cancel"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-gray-600" />
              </button>
            </>
          ) : (
            <>
              <span
                onDoubleClick={() => setIsEditing(true)}
                className="flex-1 text-sm cursor-pointer break-words text-gray-800 dark:text-gray-100"
              >
                {task.text}
              </span>

              {/* Show favorite button only if not in trash */}
              {!isTrashView && onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  title={task.favorite ? "Unfavorite" : "Favorite"}
                >
                  {task.favorite ? (
                    <Star className="w-4 h-4 text-yellow-400 hover:text-yellow-500" />
                  ) : (
                    <StarOff className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                  )}
                </button>
              )}

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
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

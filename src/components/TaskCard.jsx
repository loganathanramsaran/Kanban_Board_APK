import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// TaskCard.jsx
import { useState, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

export default function TaskCard({ task, index, onDelete, onEdit }) {
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
          className={`flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-sm transition-all duration-300 ${
            snapshot.isDragging ? "bg-blue-100 dark:bg-blue-900 scale-105" : ""
          }`}
        >
          {isEditing ? (
            <>
              <input
                className="flex-1 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
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
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText(task.text);
                }}
                title="Cancel"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </>
          ) : (
            <>
              <span
                onDoubleClick={() => setIsEditing(true)}
                className="flex-1 text-sm cursor-pointer break-words dark:text-white"
              >
                {task.text}
              </span>
              <button onClick={() => setIsEditing(true)} title="Edit">
                <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700" />
              </button>
              <button onClick={onDelete} title="Delete">
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}


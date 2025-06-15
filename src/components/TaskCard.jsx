import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
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
          className={`p-3 rounded-lg flex justify-between items-center gap-2 transition-all duration-200 shadow-md select-none 
            ${snapshot.isDragging ? "bg-blue-100 dark:bg-blue-800 scale-105" : "bg-white dark:bg-gray-800"}`}
        >
          {isEditing ? (
            <>
              <input
                className="flex-1 border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
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
              <button onClick={handleEdit} className="text-green-600 dark:text-green-400">
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText(task.text);
                }}
                className="text-gray-500 dark:text-gray-300"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <span
                className="flex-1 cursor-pointer text-sm text-gray-800 dark:text-gray-100"
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.text}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-300"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 dark:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

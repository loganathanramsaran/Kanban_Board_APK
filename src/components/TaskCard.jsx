import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
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
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-gray-100 p-2 rounded flex justify-between items-center gap-2 transition 
            ${snapshot.isDragging ? "bg-blue-100 shadow-md" : ""}`}
        >
          {isEditing ? (
            <>
              <input
                className="flex-1 border rounded px-1"
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
              <button onClick={handleEdit} className="text-green-600 text-sm">
                ✔
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText(task.text);
                }}
                className="text-gray-500 text-sm"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <span
                className="flex-1 cursor-pointer"
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.text}
              </span>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

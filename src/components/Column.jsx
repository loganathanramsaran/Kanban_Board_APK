// Column.jsx
import { useState } from "react";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
export default function Column({ columnId, title, tasks = [], onAdd, onDelete, onEdit }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(columnId, input); // use columnId, not column.id
    setInput("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-80">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="space-y-2 mb-4 min-h-[50px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={() => onDelete(columnId, task.id)}
                onEdit={(newText) => onEdit(columnId, task.id, newText)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="flex gap-2">
        <input
          className="border flex-1 p-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

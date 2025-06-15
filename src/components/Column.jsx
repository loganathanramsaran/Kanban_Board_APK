import { useState } from "react";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { PlusCircle } from "lucide-react";

export default function Column({ columnId, title, tasks = [], onAdd, onDelete, onEdit }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(columnId, input);
    setInput("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 w-full max-w-sm transition duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        {title}
      </h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="space-y-3 mb-4 min-h-[60px] transition-all"
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

      <div className="flex gap-2 items-center mt-2">
        <input
          className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm rounded px-2 py-1 flex-1 text-gray-900 dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow-md transition duration-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import TaskCard from "./TaskCard";
import { Droppable } from '@hello-pangea/dnd'
import { PlusCircle } from "lucide-react";

export default function Column({ columnId, title, tasks = [], onAdd, onDelete, onEdit }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(columnId, input);
    setInput("");
  };

  return (
    <div className="bg-mint-100 dark:bg-gray-700 shadow-xl rounded-2xl p-4 w-full max-w-sm transition duration-300 border border-mint-200">
      <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200 text-center tracking-wide">
        {title}
      </h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="space-y-3 mb-4 min-h-[60px] overflow-y-auto transition"
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
          className="border border-emerald-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm 
          rounded px-2 py-1 flex-1 text-gray-800 dark:text-white placeholder:text-gray-400
           dark:placeholder:text-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 
          rounded shadow-md transition duration-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Add</span>
        </button>
      </div>
    </div>
  );
}

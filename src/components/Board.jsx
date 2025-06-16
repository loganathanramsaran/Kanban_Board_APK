import { DragDropContext } from '@hello-pangea/dnd'
import { useEffect, useState } from "react";
import Column from "./Column";
import { RotateCcw } from "lucide-react";

const initialData = [
  {
    id: "todo",
    title: "To Do",
    tasks: [],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [],
  },
  {
    id: "done",
    title: "Done",
    tasks: [],
  },
];

export default function Board() {
  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem("kanban-data");
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, text) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [...col.tasks, { id: Date.now().toString(), text }],
            }
          : col
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== taskId),
            }
          : col
      )
    );
  };

  const editTask = (columnId, taskId, newText) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : col
      )
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns.find((col) => col.id === source.droppableId);
    const destCol = columns.find((col) => col.id === destination.droppableId);
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.tasks.splice(destination.index, 0, movedTask);
      setColumns((prev) =>
        prev.map((col) => (col.id === sourceCol.id ? { ...sourceCol } : col))
      );
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask);
      setColumns((prev) =>
        prev.map((col) =>
          col.id === sourceCol.id
            ? { ...sourceCol }
            : col.id === destCol.id
            ? { ...destCol }
            : col
        )
      );
    }
  };

  const resetBoard = () => {
    setColumns(initialData);
    localStorage.removeItem("kanban-data");
  };

  return (
    <div className="Board-main p-4">
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-200">Task Board</h1>
        <button
          onClick={resetBoard}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded 
          shadow transition duration-200"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={column.tasks}
              onAdd={addTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

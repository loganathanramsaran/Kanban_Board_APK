// Board.jsx
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { RotateCcw } from "lucide-react";
import TaskForm from "./TaskForm";

export default function Board({ columns, setColumns }) {
  const addTask = (columnId, data) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: Date.now().toString(),
                  title: data.title,
                  description: data.description || "",
                  tags: data.tags || [],
                  priority: data.priority || "low",
                  favorite: false,
                  trashed: false,
                },
              ],
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

  const editTask = (columnId, taskId, updatedFields) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedFields } : task
              ),
            }
          : col
      )
    );
  };

  const handleToggleFavorite = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, favorite: !task.favorite }
                  : task
              ),
            }
          : col
      )
    );
  };

  const handleTrashTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, trashed: true } : task
              ),
            }
          : col
      )
    );
  };

  const handleRestoreTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, trashed: false } : task
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
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask);
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceCol.id) return { ...sourceCol };
        if (col.id === destCol.id) return { ...destCol };
        return col;
      })
    );
  };

  const resetBoard = () => {
    const initialData = [
      { id: "todo", title: "To Do", tasks: [] },
      { id: "inprogress", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ];
    setColumns(initialData);
    localStorage.removeItem("kanban-data");
  };

  return (
    <div className="Board-main my-4 mr-2">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl flex justify-center w-full md:text-3xl font-bold text-green-800 dark:text-green-200">
          Task Board
        </h1>
        <button
          onClick={resetBoard}
          className="flex justify-end items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition duration-200"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="ml-2">
      <TaskForm columns={columns} onAddTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={column.tasks.filter((task) => !task.trashed)}
              onAdd={addTask}
              onDelete={deleteTask}
              onEdit={editTask}
              onToggleFavorite={handleToggleFavorite}
              onTrash={handleTrashTask}
              onRestore={handleRestoreTask}
            />
          ))}
        </div>
      </DragDropContext>
      </div>
    </div>
  );
}

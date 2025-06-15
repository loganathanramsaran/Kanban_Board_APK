import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useEffect, useState } from "react";
import Column from "./Column";
import { motion } from "framer-motion";

const initialData = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
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
        prev.map((col) =>
          col.id === sourceCol.id ? { ...sourceCol } : col
        )
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <motion.div
        className="flex gap-6 px-4 py-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
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
      </motion.div>
    </DragDropContext>
  );
}


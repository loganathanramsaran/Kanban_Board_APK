import { useEffect, useState } from "react";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
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
    setColumns(prev =>
      prev.map(col =>
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
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter(task => task.id !== taskId),
            }
          : col
      )
    );
  };

  const editTask = (columnId, taskId, newText) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map(task =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : col
      )
    );
  };

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns.find(col => col.id === source.droppableId);
    const destCol = columns.find(col => col.id === destination.droppableId);

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.tasks.splice(destination.index, 0, movedTask);
      setColumns(prev =>
        prev.map(col => (col.id === sourceCol.id ? { ...sourceCol } : col))
      );
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask);
      setColumns(prev =>
        prev.map(col =>
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
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map(column => (
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
  );
}

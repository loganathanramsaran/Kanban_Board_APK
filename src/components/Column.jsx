import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

export default function Column({
  columnId,
  title,
  tasks = [],
  onDelete,
  onEdit,
  onToggleFavorite,
  onTrash,
  onRestore,
  isTrashView = false,
}) {
  return (
    <div className="bg-emerald-50 dark:bg-gray-700 shadow-xl rounded-2xl p-4 w-full max-w-sm transition duration-300 border border-mint-200">
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
                onEdit={(updatedFields) =>
                  onEdit(columnId, task.id, updatedFields)
                }
                onToggleFavorite={() => onToggleFavorite(columnId, task.id)}
                onTrash={() => onTrash(columnId, task.id)}
                onRestore={() => onRestore(columnId, task.id)}
                isTrashView={isTrashView}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

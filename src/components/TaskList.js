// src/components/TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, filter, setFilter, toggleTaskStatus, deleteTask }) => {
  // Filtrar tareas según el estado del filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true; // "all"
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <select 
  value={filter} 
  onChange={(e) => setFilter(e.target.value)}
  className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium"
>
  <option value="all">Todas las Tareas</option>
  <option value="pending">Tareas Pendientes</option>
  <option value="completed">Tareas Completadas</option>
</select>

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay tareas para mostrar 😴
          </p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
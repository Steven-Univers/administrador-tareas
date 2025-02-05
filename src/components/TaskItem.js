// src/components/TaskItem.js
import React from "react";

const TaskItem = ({ task, toggleTaskStatus, deleteTask }) => {
  return (
    <li className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-1 flex items-center gap-2">
            {task.status === "completed" && "✅"}
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1 pl-2 border-l-4 border-gray-200">
              {task.description}
            </p>
          )}
        </div>
        
        <button 
          onClick={() => toggleTaskStatus(task.id)}
          className={`p-2 rounded-full ${task.status === "pending" ? "text-blue-500 hover:bg-blue-50" : "text-gray-400 hover:bg-gray-50"}`}
        >
          {task.status === "pending" ? "◻️" : "✔️"}
        </button>
      </div>

      {task.status === "completed" && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => deleteTask(task.id)}
            className="text-red-500 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-md"
          >
            🗑️ Eliminar
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
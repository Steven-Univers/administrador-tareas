import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    addTask(newTask);
    setNewTask({ title: "", description: "", status: "pending" });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm mb-6 p-4 border border-gray-200" // Borde sutil
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            📝 Título
          </label>
          <input
            type="text"
            name="title"
            placeholder="Ej: Comprar leche"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            📋 Descripción
          </label>
          <textarea
            name="description"
            placeholder="Ej: Descremada, 1 litro"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none transition-all"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          ➕ Agregar Tarea
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
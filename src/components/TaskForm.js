// components/TaskForm.js

import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [error, setError] = useState("");

  // Actualiza el estado según el name del input
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
      setError("Todos los campos son obligatorios.");
      return;
    }
    addTask(newTask);
    setNewTask({ title: "", description: "", status: "pending" });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Campo para el título de la tarea */}
      <label htmlFor="title" className="block text-gray-700 mb-1">
        Título de la tarea:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Ingresa el título"
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Campo para la descripción */}
      <label htmlFor="description" className="block text-gray-700 mb-1">
        Descripción:
      </label>
      <textarea
        id="description"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Ingresa la descripción"
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      ></textarea>

      {/* Mostrar error si existe */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Botón para agregar la tarea */}
      <button
        type="submit"
        className="!bg-[#16a34a] !border !border-black !text-white font-bold py-2 px-4 rounded hover:!bg-[#15803b] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#15803b]"
      >
        ➕ Agregar Tarea
      </button>
    </form>
  );
};

export default TaskForm;

// src/App.js
import React, { useState, useEffect, useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Estado para controlar la visualización del modal con el formulario
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // Referencia para detectar la primera renderización
  const isFirstRender = useRef(true);

  // Cargar tareas desde Local Storage al inicio
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en Local Storage cada vez que cambien
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Agregar una nueva tarea
  const addTask = (newTask) => {
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  // Función que envuelve addTask y cierra el modal
  const handleAddTask = (newTask) => {
    addTask(newTask);
    setIsTaskFormOpen(false);
  };

  // Cambiar el estado de una tarea (completada/pendiente)
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === "pending" ? "completed" : "pending",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 mt-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white rounded-full p-2">✓</span>
          🚀 Administrador de Tareas
        </h1>

        {/* Botón para abrir el modal de agregar tarea */}
        <div className="mb-4">
          <button
            className="!bg-[#16a34a] !border !border-black !text-white font-bold py-2 px-4 rounded hover:!bg-[#15803b] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#15803b]"
            onClick={() => setIsTaskFormOpen(true)}
          >
            Agregar Nueva Tarea
          </button>
        </div>

        {/* Modal para agregar tarea */}
        {isTaskFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white rounded p-6 w-11/12 max-w-md relative">
              {/* Botón para cerrar el modal */}
              <button
                onClick={() => setIsTaskFormOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                X
              </button>
              <TaskForm addTask={handleAddTask} />
            </div>
          </div>
        )}

        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      </div>
      <div id="modal-root"></div>
    </div>
  );
};

export default App;

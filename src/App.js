// src/App.js
import React, { useState, useEffect, useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Referencia para detectar la primera renderización
  const isFirstRender = useRef(true);

  // Cargar tareas desde Local Storage al inicio
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tareas cargadas desde Local Storage:", savedTasks); // Depuración
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en Local Storage cada vez que cambien
  useEffect(() => {
    if (isFirstRender.current) {
      // No guardar en la primera renderización
      isFirstRender.current = false;
      return;
    }
    console.log("Guardando tareas en Local Storage:", tasks); // Depuración
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

  // Eliminar una tarea completada
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  console.log("Tareas pasadas a TaskList:", tasks); // Depuración
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl"> {/* Ancho máximo similar a iOS */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 mt-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white rounded-full p-2">✓</span>
          🚀 Administrador de Tareas
        </h1>
        
        <TaskForm addTask={addTask} />
        
        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;


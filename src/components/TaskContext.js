
//  /components/TaskContext.js  

import { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde Local Storage al inicio
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en Local Storage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

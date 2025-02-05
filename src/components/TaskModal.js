// src/components/TaskModal.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const TaskModal = ({ closeModal, onAdd, onUpdate, task }) => {
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.getElementById('task-name')?.focus();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('El nombre de la tarea es obligatorio.');
      return;
    }

    const newTask = {
      id: task ? task.id : Date.now(),
      name,
      description,
      completed: task ? task.completed : false,
    };

    task ? onUpdate(newTask) : onAdd(newTask);
    handleClose();
  };

  return ReactDOM.createPortal(
    <div
      className={`
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
        transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="bg-white rounded p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4">{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task-name" className="block mb-1">Nombre de la tarea</label>
            <input
              id="task-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe el nombre de la tarea"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="task-desc" className="block mb-1">Descripción / Nota</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe una descripción o nota"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {task ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default TaskModal;


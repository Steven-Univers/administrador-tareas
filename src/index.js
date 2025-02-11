import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TaskProvider from './components/TaskContext';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
  
);

reportWebVitals();





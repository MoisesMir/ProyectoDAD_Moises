import React, { useState } from 'react';
import './Botones.css'; // Asegúrate de tener la hoja de estilos para la animación

export const Compone = () => {
  const [tarea, setTarea] = useState(''); // Estado para la tarea
  const [tareasList, setTareasList] = useState([]); // Lista de tareas
  const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad de la lista

  // Maneja el cambio en el input
  const handleTareaChange = (e) => {
    setTarea(e.target.value);
  };

  // Agrega una nueva tarea a la lista
  const handleAgregarTarea = () => {
    if (tarea.trim() !== '') {
      setTareasList([...tareasList, tarea]);
      setTarea(''); // Limpiar el input después de agregar la tarea
    }
  };

  // Eliminar tarea de la lista
  const handleEliminarTarea = (index) => {
    const nuevasTareas = tareasList.filter((_, i) => i !== index);
    setTareasList(nuevasTareas);
  };

  // Alternar visibilidad de la lista
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="tareas-container">

      <div>
        {/* Botón para alternar entre mostrar y ocultar */}
        <button onClick={toggleVisibility} className="toggleButton">
          {isVisible ? 'Ocultar Componente' : 'Mostrar Componente'}
        </button>
      </div>

      {/* Formulario para agregar tarea */}
      {isVisible && (
        <div className="fade-container fade-in">
          <div className="tarea-form">
          <h3>Lista de Tareas</h3>
            <input
              type="text"
              value={tarea}
              onChange={handleTareaChange}
              placeholder="Escribe una tarea..."
            />
            <button onClick={handleAgregarTarea}>Agregar Tarea</button>
          </div>

          {/* Lista de tareas */}
          <ul className="tareas-list">
            {tareasList.map((tarea, index) => (
              <li key={index}>
                {tarea}
                <button
                  onClick={() => handleEliminarTarea(index)}
                  className="eliminar-btn"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

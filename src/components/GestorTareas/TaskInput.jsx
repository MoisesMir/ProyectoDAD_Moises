import React, { useState } from "react";

export const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState(""); // Estado para manejar el texto ingresado

  const handleAddClick = () => {
    if (task.trim()) {
      onAddTask(task); // Añade la tarea
      setTask(""); // Limpia el cuadro de texto después de darle al botón
    }
  };

  // Cuadro de texto en el que pondremos la tarea a realizar y
  // le daremos al botón "Agregar Tarea"
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={handleAddClick}>Agregar Tarea</button>
    </div>
  );
};

// Exportamos la función
export default TaskInput;

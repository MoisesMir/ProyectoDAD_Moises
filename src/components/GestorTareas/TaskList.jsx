import React from "react";

export const TaskList = ({ tasks, onDeleteTask }) => {
    return (
      <ol>
        {tasks.map((task, index) => (
          // Lista ordenada en la que se basa nuestra lista de tareas
          <li key={index}>
            {task}{" "}
            {/* Botón eliminar al que se le añade la función eliminar tarea */}
            <button onClick={() => onDeleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ol>
    );
  };
  
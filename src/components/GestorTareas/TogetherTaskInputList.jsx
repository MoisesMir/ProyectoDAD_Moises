import React, { useState } from "react";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";
import './TogetherTaskInputList.css'

export const TogetherTaskInputList = () => {
  const [tasks, setTasks] = useState([]); // Estado para la lista de tareas

  // Agrega una nueva tarea a la lista
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Elimina la tarea seleccionada
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "25px" }}>
      <h1>Gestor de Tareas</h1>

      {/* Input para agregar tareas */}
      <TaskInput onAddTask={addTask} />

      {/* Lista de tareas en la que podemos tanto añadir como eliminar las tareas */}
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
};

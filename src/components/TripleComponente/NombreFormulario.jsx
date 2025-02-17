import React, { useState } from 'react';
import './Botones.css'; // Asegúrate de tener la hoja de estilos para la animación

// Componente 2: Formulario de nombre
export function NombreFormulario() {
  const [nombre, setNombre] = useState('');
  const [saludo, setSaludo] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad

  const handleSubmit = () => {
    setSaludo(`¡Hola, ${nombre}!`);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Alterna entre mostrar y ocultar
  };

  return (
    <>
      <div>
        {/* Botón para alternar entre mostrar y ocultar */}
        <button onClick={toggleVisibility} className="toggleButton">
          {isVisible ? 'Ocultar Componente' : 'Mostrar Componente'}
        </button>
      </div>

      {/* Componente con animación de visibilidad */}
      <div className={`fade-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
        {isVisible && (
          <>
            <h3>Ingresa tu nombre:</h3>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
            />
            <button onClick={handleSubmit}>Enviar</button>
            {saludo && <h3>{saludo}</h3>}
          </>
        )}
      </div>
    </>
  );
}

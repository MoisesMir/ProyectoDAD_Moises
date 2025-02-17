import React, { useState } from 'react';
import './Botones.css'

// Componente 1: Contador
export function Botones() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad

  function BotonClick(valor) {
    setCount(count + valor);
  }

  function toggleVisibility() {
    setIsVisible(!isVisible); // Alterna entre mostrar y ocultar
  }

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
            <h3>Contador: {count}</h3>
            <div>
              <button onClick={() => BotonClick(1)} className="mybutton">
                <h3>+1</h3>
              </button>
              <button onClick={() => BotonClick(-1)} className="mybutton2">
                <h3>-1</h3>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

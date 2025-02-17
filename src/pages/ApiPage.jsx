import React, { useContext } from 'react';
import { AuthContext } from '../components/InicioSesion/AuthContext';  // Importa el contexto
import { ApiCanciones } from '../components/ApiCanciones/ApiCanciones';
import { VoiceInput } from '../components/ReconocimientoVoz/VoiceInput';


import './ApiPage.css'
export const ApiPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);  // Acceder al nombre de usuario y al estado de autenticación

  return (
    <div>
      {isAuthenticated && <h2>Bienvenido {user}!</h2>} {/* Mostrar el mensaje de bienvenida solo si está autenticado */}
      <ApiCanciones /> {/* Usar el componente ApiCanciones */}
      <h1>Reconocimiento de Voz</h1>
      <VoiceInput />
    </div>
    
  );
};

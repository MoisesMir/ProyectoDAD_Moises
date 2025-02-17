import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const VoiceInput = () => {
  const [submittedText, setSubmittedText] = useState('');
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // Comprobar si el navegador soporta el reconocimiento de voz
  const isSpeechRecognitionSupported = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!isSpeechRecognitionSupported) {
    return <div>Tu navegador no soporta reconocimiento de voz.</div>;
  }

  const handleSubmit = () => {
    setSubmittedText(transcript); // Usar el transcript para lo que se ha hablado
    resetTranscript(); // Limpiar el transcript después de enviar
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening(); // Detener el reconocimiento de voz
  };

  return (
    <div>
      <input
        type="text"
        value={transcript} // Mostrar el transcript mientras hablamos
        readOnly // No permitir editar el campo de texto mientras estamos en reconocimiento
      />
      <button onClick={handleSubmit}>Enviar</button>
      {!listening ? (
        <button onClick={handleStartListening}>Escuchar</button> // Muestra el botón "Escuchar" si no estamos escuchando
      ) : (
        <button onClick={handleStopListening}>Dejar de escuchar</button> // Muestra el botón "Dejar de escuchar" si estamos escuchando
      )}
      <div>
        <h3>Texto enviado:</h3>
        <p>{submittedText}</p>
      </div>
    </div>
  );
};

import {Routes, Route } from 'react-router';  // Importa react-router-dom
import { Navbar } from './components';
import { GestorPage } from './pages/GestorPage';
import { ApiPage } from './pages/ApiPage';
import { ComponePage } from './pages/ComponePage';
import { LoginPage } from './pages/LoginPage';
import ChatbotComponent from './components/ChatBot/ChatBotComponent';
import { InformesPage } from './pages/InformePage';
import { GraficosPage } from './pages/GraficosPage';
import React from 'react';  // Solo si es necesario


function App() {
  return (
    <>
    <h1>Nuevo Título de Prueba</h1>
      <Navbar />
      <Routes>  {/* Define las rutas */}
        {/* Ruta para la API */}
        <Route path="/" element={<ApiPage></ApiPage>} />
        <Route path="/API" element={<ApiPage></ApiPage>} />
        <Route path="/componentes" element={<ComponePage></ComponePage>} />


        {/* Ruta para el Gestor de Tareas */}
        <Route path='/gestor' element={<GestorPage></GestorPage>}></Route>
        <Route path='/inicio-sesion' element={<LoginPage></LoginPage>}></Route>
        <Route path='/informes' element={<InformesPage></InformesPage>}></Route>
        <Route path='/graficos' element={<GraficosPage></GraficosPage>}></Route>


      </Routes>
       <ChatbotComponent/>
    </>
  );
}

export default App;
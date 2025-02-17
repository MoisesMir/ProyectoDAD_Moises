import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from '../src/components/InicioSesion/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <React.StrictMode>
      <App />
    </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
);

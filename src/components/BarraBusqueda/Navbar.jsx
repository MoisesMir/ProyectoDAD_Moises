import React, { useState, useRef, useEffect, useContext } from "react";
import './Navbar.css';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';  // Importación corregida
import { AuthContext } from '../InicioSesion/AuthContext';
import amadorLogo from '../../images/amador.jpg';
import { NavLink } from 'react-router-dom';

// Inicialización de Algolia
const searchClient = algoliasearch('OXJ4A4V76Y', 'cd32265fffc584cd2dcfbbfc157832d5');

const HitComponent = ({ hit }) => (
  <div className="result-item">
    <img src={hit.image} alt={hit.title} className="result-item-img" />
    <div className="result-item-info">
      <h4>{hit.title}</h4>
      <p>{hit.description}</p>
    </div>
  </div>
);

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState('');
  const popupRef = useRef(null);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSearchChange = (event) => {
    setShowResults(event.target.value.length > 0); // Mostrar el popup si hay algo en la búsqueda
  };

  const closePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowResults(false); // Cerrar el popup si el usuario hace clic fuera
    }
  };

  // Añadir un event listener para detectar clics fuera del popup
  useEffect(() => {
    document.addEventListener('mousedown', closePopup);
    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, []);

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="navbar-logo">
        <img src={amadorLogo} alt="Logo de Amador" className="logo-jpg" />
        MILF'S & DILF'S Store
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/componentes" className="nav-link active">Componentes</NavLink></li>
        <li><NavLink to="/api" className="nav-link active">API</NavLink></li>
        <li><NavLink to="/gestor" className="nav-link active">Gestor Tareas</NavLink></li>
        <li><NavLink to="/informes" className="nav-link active">Informes</NavLink></li> {/* Nueva pestaña */}
        <li><NavLink to="/graficos" className="nav-link active">Graficos</NavLink></li> {/* Nueva pestaña */}

        {!isAuthenticated ? (
          <li><NavLink to="/inicio-sesion" className="nav-link active">Iniciar Sesión</NavLink></li>
        ) : (
          <li>
            <span onClick={handleLogout} className="nav-link active" style={{ cursor: 'pointer' }}>
              <a>Cerrar Sesión</a>
            </span>
          </li>
        )}
        <li>
          <div className="buscador" ref={popupRef}>
            <InstantSearch searchClient={searchClient} indexName="id">
              <div className="search-header">
                <SearchBox
                  className="search-box"
                  onInput={handleSearchChange}
                  translations={{ placeholder: "Buscar ropa..." }}
                />
              </div>
              {showResults && (
                <div className="results-popup">
                  <Hits hitComponent={HitComponent} />
                </div>
              )}
              <Configure hitsPerPage={5} />
            </InstantSearch>
          </div>
        </li>
      </ul>
      <button className="mode-toggle" onClick={toggleMode}>
        {darkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}
      </button>
    </nav>
  );
}

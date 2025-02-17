import { Compone } from '../components/TripleComponente/Compone'
import { NombreFormulario } from '../components/TripleComponente/NombreFormulario'
import { Botones } from '../components/TripleComponente/Botones'
import './ComponePage.css';
import React from 'react';


export const ComponePage = () => {
    return (
        <div className="contenedor">
            <div className="componente">
                <Compone />
            </div>
            <div className="componente">
                <Botones />
            </div>
            <div className="componente">
                <NombreFormulario />
            </div>
        </div>
    );
};

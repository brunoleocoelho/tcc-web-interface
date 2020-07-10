import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainRouter from './MainRouter';
import './App.css';

/** Objeto que contém as principais rotas para menu */
const header = {
  title: 'Biblioteca Acadêmica',
}

// Atualização do título da página
var tituloPrincipal = document.getElementById('titulo-principal');
tituloPrincipal.innerHTML = header.title;

/**
 * Componente inicial que encapsula toda a aplicação
 */
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;

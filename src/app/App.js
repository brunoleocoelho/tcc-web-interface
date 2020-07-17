import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import { storeAllBooks } from '../services/StorageService'
import { getNavbarData } from '../services/InterfaceService'
import booksFull from '../assets/data/books.json';

import Header from '../components/Header';
import AlertCustom from '../components/AlertCustom';

// Armazenando MOCK-UP DE LIVROS
storeAllBooks(booksFull)

// Atualizando título da página
var tituloPrincipal = document.getElementById('titulo-principal');
tituloPrincipal.innerHTML = getNavbarData().title;

/**
 * Componente inicial que encapsula toda a aplicação
 */
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <MainRouter />
            </BrowserRouter>
            
            <AlertCustom />
        </div>
    );
}

export default App;

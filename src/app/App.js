import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import { storeAllBooks } from '../services/StorageService'
import { setTitleBarText } from '../services/InterfaceService'
import { CustomThemeProvider } from '../services/CustomThemeContext'
import Header from '../components/Header';
import AlertCustom from '../components/AlertCustom';
import MainWrapper from '../components/MainWrapper';
import booksFull from '../assets/data/books.json';

// Armazenando MOCK-UP DE LIVROS
storeAllBooks(booksFull)

// Atualizando título da página
setTitleBarText()

/**
 * Componente inicial que encapsula toda a aplicação
 */
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CustomThemeProvider>
                    
                    <Header />
                    <MainWrapper>
                        <MainRouter />
                    </MainWrapper>

                    <AlertCustom />
                </CustomThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;

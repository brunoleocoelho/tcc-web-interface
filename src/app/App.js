import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import { configureStore } from '../app/store'
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

/** Container para o App com inicialização do store REDUX */
function AppContainer({ children }) {
    if (!children) return null
    
    return (
        <Provider store={configureStore()}>
            { children }
        </Provider>
    )
}

/**
 * Componente principal inicial que encapsula toda a aplicação
 */
function App() {
    return (
        <AppContainer>
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
        </AppContainer>
    );
}

export default App;

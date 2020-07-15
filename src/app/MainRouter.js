import React from 'react'
import { Route } from 'react-router-dom'

import { 
    HomePage, 
    AboutPage, 
    LoginPage, 
}from '../pages'

/**
 * Componente responsável por definir as rotas principais da aplicação
 */
function MainRouter() {
    return (
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route path="/sobre" component={AboutPage} />
        </React.Fragment>
    )
}

export default MainRouter

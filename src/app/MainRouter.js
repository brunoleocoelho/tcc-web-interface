import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'

/**
 * Componente responsável por definir as rotas principais da aplicação
 */
function MainRouter() {
    return (
        <React.Fragment>
            <Route exact path="/" component={Home} />
        </React.Fragment>
    )
}

export default MainRouter

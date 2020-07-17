import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { getUser } from '../services/AuthenticationService'
import { 
    HomePage, 
    AboutPage, 
    LoginPage, 
}from '../pages'

/**
 * Componente responsável por definir as rotas principais da aplicação
 */
function MainRouter(props) {
    console.log("MainRouter props", props)
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />

            <PrivateRoute exact path="/home" component={props => HomePage(props)} />
            <PrivateRoute path="/sobre" component={props => AboutPage(props)} />

            <PrivateRoute exact path="/" component={props => HomePage(props)} />
        </Switch>
    )
}

/**
 * Rota customizada que avalia se usuário está autenticado
 */
function PrivateRoute(props) {
    const isUserLogged = getUser()
    console.log("PrivateRoute isUserLogged", isUserLogged)

    const { component: Component, ...rest } = props
    return (
        <Route {...rest} 
            render={ props => (
                (isUserLogged) 
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            )} 
        />
    )
}

export default MainRouter

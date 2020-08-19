import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { getUser } from '../services/AuthenticationService'
import { 
    HomePage, 
    AboutPage, 
    LoginPage, 
    LivrosPage,
    TemasCoresPage,
    BuscaPage
}from '../pages'


/**
 * Componente responsável por definir as rotas principais da aplicação
 */
function MainRouter(props) {
    // console.log("MainRouter props", props)
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />

            <PrivateRoute exact path="/dashboard" component={HomePage} />
            <PrivateRoute path="/livros" component={LivrosPage} />
            <PrivateRoute path="/busca" component={BuscaPage} />
            <PrivateRoute path="/sobre" component={AboutPage} />
            <PrivateRoute path="/temas-cores" component={TemasCoresPage} />

            <Redirect from="/" to="/dashboard" component={HomePage} />
        </Switch>
    )
}

/**
 * Rota customizada que avalia se usuário está autenticado
 */
function PrivateRoute(props) {
    const userLogged = getUser()
    // console.log("PrivateRoute userLogged", {props, userLogged})

    const { component: Component, ...rest } = props
    return (
        <Route {...rest} 
            render={ props => (
                (userLogged) 
                    ? <Component {...props} user={userLogged} />
                    : <Redirect to="/login" />
            )} 
        />
    )
}

export default MainRouter

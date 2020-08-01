import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { getUser } from '../services/AuthenticationService'
import { 
    HomePage, 
    AboutPage, 
    LoginPage, 
    LivrosPage,
    TemasCoresPage
}from '../pages'


/**
 * Componente responsável por definir as rotas principais da aplicação
 */
function MainRouter(props) {
    // console.log("MainRouter props", props)
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />

            <PrivateRoute exact path="/dashboard" component={props => HomePage(props)} />
            <PrivateRoute path="/livros" component={props => LivrosPage(props)} />
            <PrivateRoute path="/sobre" component={props => AboutPage(props)} />
            <PrivateRoute path="/temas-cores" component={props => TemasCoresPage(props)} />

            {/* <PrivateRoute exact path="/" component={props => HomePage(props)} /> */}
            <Redirect from="/" to="/dashboard" component={props => HomePage(props)} />
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

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
function MainRouter() {
    const usrLogged = getUser()
    console.log("MainRouter usrLogged", usrLogged)
    return (
        <Switch>
            {(usrLogged === null) && <LoginPage /> }

            <Route exact path="/home" component={props => HomePage(props)} />
            <Route path="/sobre" component={props => AboutPage(props)} />

            <Route exact path="/" render={props => <Redirect to="/home" {...props} />} />
        </Switch>
    )
}

export default MainRouter

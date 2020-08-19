import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BuscaAvancada from './BuscaAvancada'

function Busca(props) {
    const { match } = props

    return (
        <Switch>
            <Route path={match.path} component={BuscaAvancada} />

            <Redirect to={match.path} />
        </Switch>
    )
}

export default Busca

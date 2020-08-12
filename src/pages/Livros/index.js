import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LivrosList from './LivrosList'
import LivroDetails from './LivroDetails'

/**
 * Componente redireciona para página de livros 
 */
function Livros(props) {
    const { match } = props
    
    return (
        <Switch>
            <Route exact path={match.path} component={LivrosList} />
            <Route path={`${match.path}/info/:id`} component={LivroDetails} />
        </Switch>
    )
}

export default Livros
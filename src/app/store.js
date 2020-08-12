import { createStore, compose } from 'redux'
import reducers from '../services/reducers'

// Inicia o store REDUX
export function configureStore(initialState) {
    const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        reducers,
        initialState,
        composeEnhacers()
    )

    return store
}



import React from 'react'
import './LoadingLocal.css'

const imgLoading = require('../../assets/img/loading.gif')

/** Renderiza uma imagem de loading para o carregamento do componente */
function LoadingLocal({ message }) {
    return (
        <div className="loading">
            <img src={imgLoading} alt="Loading" />
            <p>{ message }</p>
        </div>
    )
}

LoadingLocal.defaultProps = {
    message: ''
}

export default LoadingLocal

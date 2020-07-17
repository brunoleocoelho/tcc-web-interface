import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

let timeout = 4000
let changeAlertState = null

/**
 * Renderiza um alerta na tela
 */
function AlertCustom() {
    // STATE
    const [alertState, setAlertState] = useState(null)

    // componentDidMount
    useEffect(() => {
        changeAlertState = (newState) => {
            setAlertState(newState)
        }
    }, [])

    // Se 'alertState' null, não renderizar
    if (!alertState) return null;

    const { show, message, type, title, onCloseAction, closeable } = alertState
    return ( 
        <Alert 
            show={show} 
            variant={type || 'primary'}
            onClose={onCloseAction} 
            dismissible={closeable}
            style={styles.alertStyle}
            transition
        >
            { title && <Alert.Heading>{ title }</Alert.Heading> }
            
            <p>{ message || 'TESTE' }</p>
        </Alert>
    )
}

/**
 * Atua na exibição do AlertCustom 
 * @param {boolean} show 
 * @param {string} message 
 * @param {'success'|'danger'|'warning'|'info'} type 
 * @param {string} title 
 * @param {function} onCloseAction 
 * @param {boolean} closeable 
 */
AlertCustom.show = function(show, message, type, title = null, onCloseAction, closeable = false) {
    changeAlertState({
        show, message, type, title, onCloseAction, closeable
    })

    setTimeout(() => {
        changeAlertState(null)
    }, timeout);
}

/** Atua na ocultação do AlertCustom */
AlertCustom.close = function() {
    changeAlertState(null)
}

const styles = {
    alertStyle: {
        position: 'absolute',
        width: 'fit-content',
        margin: 'auto',
        bottom: 20,
        right: 0,
        left: 0,
        zIndex: 9999,
    }
}

export default AlertCustom

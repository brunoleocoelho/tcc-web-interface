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

    const { show, message, type, title, icon, onCloseAction, closeable } = alertState
    
    return ( 
        <Alert 
            show={show} 
            variant={type || 'primary'}
            onClose={onCloseAction} 
            dismissible={closeable}
            style={styles.alertStyle}
            transition
        >
            { title && (
                <Alert.Heading>
                    { title }
                </Alert.Heading>) 
            }
            
            <p>
                {icon && <i className={`fa fa-${icon}`}></i>}
                &nbsp;
                { message || 'TESTE' }
            </p>
        </Alert>
    )
}

/**
 * Atua na exibição do AlertCustom 
 * @param {boolean} show 
 * @param {string} message 
 * @param {string} icon Fontawesome icon
 * @param {'success'|'danger'|'warning'|'info'} type 
 * @param {string} title 
 * @param {function} onCloseAction 
 * @param {boolean} closeable 
 */
AlertCustom.show = function({show, message, icon, type, title = null, onCloseAction, closeable = false}) {
    changeAlertState({
        show, message, icon, type, title, onCloseAction, closeable
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
        boxShadow: '4px 4px 12px black',
        bottom: 12,
        right: 12,
        zIndex: 9999,
    }
}

export default AlertCustom

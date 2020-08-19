import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import './AlertCustom.css'

let timeout = 3000
let changeAlertState = null
const initialAlertState = { show: false }

/**
 * Renderiza um alerta na tela
 */
function AlertCustom() {
    // STATE
    const [alertState, setAlertState] = useState(initialAlertState)

    // componentDidMount
    useEffect(() => {
        changeAlertState = (newState) => {
            setAlertState(newState)
        }
    }, [])

    // Se 'alertState' null, não renderizar
    // if (!alertState) return null;

    const { show, message, type, title, icon, onCloseAction, closeable } = alertState

    return ( 
        <Alert 
            // show={show} 
            variant={type || 'primary'}
            onClose={onCloseAction} 
            dismissible={closeable}
            // style={styles.alertStyle}
            className={`alertcustom-container ${show ? 'visible' : 'unvisible'}`}
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

    // Fecha
    setTimeout(() => {
        changeAlertState({
            show: false, message, icon, type, title, onCloseAction, closeable
        })
    }, timeout);

    // apaga
    setTimeout(() => AlertCustom.clean(), (timeout*1.5));

}

/** Atua na ocultação do AlertCustom */
AlertCustom.clean = function() {
    changeAlertState(initialAlertState)
}

export default AlertCustom

import React, {useState} from 'react'
import { Button, Toast } from 'react-bootstrap'

/**
 * Componente que renderiza um toast de notificação
 */
function ToastCustom({ children }) {
    const [show, toggleShow] = useState(false);

    return (
        <>
            {!show &&
                <Button onClick={() => toggleShow(!show)}>Notificação</Button>
            }

            <Toast show={show} onClose={() => toggleShow(!show)} >
                <Toast.Header>
                    <strong className="mr-auto">Toast</strong>
                </Toast.Header>
                <Toast.Body>
                    { children }
                </Toast.Body>
            </Toast>
        </>
    );
};

export default ToastCustom
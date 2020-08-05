import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import CustomThemeContext from '../../../services/CustomThemeContext'
import EmptyContent from '../../EmptyContent'
import { themes } from '../../../utils/constants'

import './ModalFilters.css'

/** Componente do Modal que é aberto para os filtros em telas pequenas */
function ModalFilters(props) {
    // PROPS
    const { show, title, actions, children } = props

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="modal-filters"
            centered
            className="modal-filter-container"
        >
            <Modal.Header style={theme.fourth}>
                <Modal.Title id="modal-filters">
                    { title }
                    <div className="modal-actions">
                        { actions.map((action, key) => {
                            return (
                                <Button key={key}
                                    variant={action.variant}
                                    onClick={action.onClick}
                                >
                                    <i className={`fa fa-fw fa-${action.icon}`}></i>
                                    { action.label }
                                </Button>
                            )
                        }) }
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={theme.fourth}>
                { children }
            </Modal.Body>

            <Modal.Footer style={theme.fourth}>
                {/* <Button onClick={onHide}>
                    Feito
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

// DEFAULT PROPS
ModalFilters.defaultProps = {
    show: false,
    titulo: '',
    theme: themes.light,
    actions: [],
    children: <EmptyContent />
}

export default ModalFilters

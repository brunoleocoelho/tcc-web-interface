import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

/**
 * Componente que recebe actions dos filtros
 * para renderizar em gupo de botões
 */
function FilterActions({ actions }) {
    if (!actions) return null;

    return (
        <ButtonGroup>
            { actions.map((act, idx) => (
                <Button
                    key={`filter-action-${idx}-${String(act.label).replace(' ','-')}`}
                    variant="link"
                    style={styles.btnFilter}
                    onClick={act.onClick}
                >
                    { act.icon && <i className={`fa fas-${act.icon}`}></i>}
                    { act.label }
                </Button>
            )) }
        </ButtonGroup>
    )
}

const styles = {
    btnFilter: {
        padding: '0px 2px',
        fontSize:'0.8rem',
    },
}

export default FilterActions

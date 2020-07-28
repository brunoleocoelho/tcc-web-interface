import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import './FilterActions.css'

/**
 * Componente que recebe actions dos filtros
 * para renderizar em gupo de botões
 */
function FilterActions({ actions }) {
    if (!actions) return null;

    return (
        <ButtonGroup>
            { actions.map((act, idx) => {
                const keyBtn = `filter-action-${idx}-${String(act.label).replace(' ','-')}`
                
                return (
                    <Button
                        key={keyBtn}
                        variant="link"
                        className="btn-filter"
                        onClick={act.onClick}
                        // style={styles.btnFilter}
                    >
                        { act.icon && <i className={`fa fas-${act.icon}`}></i>}
                        { act.label }
                    </Button>
                )
            }) }
        </ButtonGroup>
    )
}

export default FilterActions

import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import CustomThemeContext from '../../services/CustomThemeContext';

import './PageActions.css'

/**
 * Renderiza os botões de ação da página
 */
function PageActions({ actions }) {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    console.log(theme)

    const numActions = 3
    const firstActions = [...actions.filter((item, idx) => (idx < numActions))]
    const lastActions = [...actions.filter((item, idx) => (idx >= numActions))]

    // renderiza um botão de action
    const renderAction = (item, idx, x, isInGroup) => {
        const as = isInGroup ? {as: Dropdown.Item} : {}

        return (
            <Button
                key={`hpa-btn-${item.label}-${idx}-${isInGroup}`}
                onClick={item.onClick ? item.onClick : null}
                variant={item.variant? item.variant : theme.themeName}
                href={item.href ? item.href : null}
                {...as}
            >
                { item.icon && <i className={`fa fa-fw fa-${item.icon}`}></i> }
                { item.label }
            </Button>
        )
    }

    return (
        <div className="actions">
            <ButtonGroup>
                {/* BOTÕES DE ACTIONS PRINCIPAIS */}
                { firstActions.map(renderAction) }

                {/* DROPDOWN PARA MAIS DE 3 BOTÕES */}
                { lastActions.length > 0 && (
                    <DropdownButton
                        as={ButtonGroup}
                        title=""
                        id="page-actions"
                        variant={theme.themeName}
                    >
                        { lastActions.map(
                            (item, idx) => renderAction(item, idx, null, true)
                        )}
                    </DropdownButton>
                )}
            </ButtonGroup>
        </div>
    )
}

PageActions.defaultProps = {
    actions: []
}

export default PageActions

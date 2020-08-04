import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import CustomThemeContext from '../../services/CustomThemeContext';

import './PageActions.css'

/**
 * Renderiza os botões de ação da página
 */
function PageActions({ actions, groupLast }) {
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    console.log(theme)

    const numActions = 3
    const firstActions = [...actions.filter((item, idx) => (idx < numActions))]
    const lastActions = [...actions.filter((item, idx) => (idx >= numActions))]

    // renderiza um botão de action
    const renderAction = (item, idx, xNulo, isInGroup) => {
        const { label, onClick, icon, href, variant, ...rest } = item
        const as = isInGroup ? {as: Dropdown.Item} : {}

        return (
            <Button
                key={`hpa-btn-${label}-${idx}-${isInGroup}`}
                onClick={onClick ? onClick : null}
                variant={variant? variant : theme.themeName}
                href={href ? href : null}
                {...as}
                {...rest}
            >
                { icon && <i className={`fa fa-fw fa-${icon}`}></i> }
                { label }
            </Button>
        )
    }

    return (
        <div className="actions">
            <ButtonGroup>
                { groupLast 
                    ? (<>
                        {/* BOTÕES DE ACTIONS PRINCIPAIS */}
                        {firstActions.map(renderAction)}
        
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
                    </>)
                    : ( actions.map(renderAction) )
                }
            </ButtonGroup>
        </div>
    )
}

PageActions.defaultProps = {
    actions: [],
    groupLast: false
}

export default PageActions

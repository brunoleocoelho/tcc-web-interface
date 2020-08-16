import React from 'react'
import { Button } from 'react-bootstrap'

function BookActions({ actions, book, theme }) {
    const hasActions = (actions && actions.length > 0)

    if (!hasActions) return null

    // Agrupando em 3 botões, mais que isso "collapse"
    return (
        <div className="book-actions">
            { actions.map((act, idx) => {
                const key= `btn-${idx}-${act.label.toLowerCase()}`
                const hasManyActs = (actions.length >= 3)
                const colGroupType = (hasManyActs && idx > 2)
                // const colDfltXsSize = (hasManyActs) ? 4 : 6

                if (colGroupType) return null

                return(
                    <Button
                        key={key}
                        size="sm"
                        variant={act.variant || theme.themeName}
                        onClick={() => act.onClick(book)}
                    >
                        <i className={`fa fa-fw fa-${act.icon}`}></i>
                        { act.label }
                    </Button>
                )
            }) }
        </div>
    )
}

export default BookActions

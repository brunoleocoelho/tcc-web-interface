import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'

function BookActions({ actions }) {
    const hasActions = (actions && actions.length > 0)

    if (!hasActions) return null

    // Agrupando em 3 botões, mais que isso "collapse"
    return (
        <Row className="book-actions p-1 h-25">
            { actions.map((act, idx) => {

                const hasManyActs = (actions.length >= 3)
                const colDfltXsSize = (hasManyActs) ? 4 : 6
                const colGroupType = (hasManyActs && idx > 2)

                if (colGroupType) return null

                return(
                    <Col xs={colDfltXsSize}>
                        <Button
                            variant={act.style}
                            onClik={act.onClik}
                        >
                            { act.title }
                        </Button>
                    </Col>
                )
            }) }
        </Row>
    )

}

export default BookActions

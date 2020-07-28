import React from 'react'
import { Badge, Row } from 'react-bootstrap'
import SectionBook from '../../SectionBook'

/**
 * Body para o conteúdo do Section Subject
 */
function BodySection({ title, items, note, variant, bodyStyle, layout }) {
    const contentStyle = (bodyStyle ? bodyStyle : {})
    const idBody = "section-body-"+ title.replace(" ","-")

    /** Retorna uma nota de aviso sobre o item */
    const renderNoteText = (idx) => (
        <Badge variant={variant}>
            {note.join(` ${idx} `) }
        </Badge>
    )

    return (
        <Row id={idBody} className="section-body p-2 m-0" style={contentStyle}>
            { items.map((bk, idx) => {
                
                if (idx >= 4) return null

                return (
                    <SectionBook 
                        key={`${bk.id}-${bk.isbn}`} 
                        book={bk} 
                        noteMark={renderNoteText(idx)}
                        disposition={layout}
                    />
                ) 
            }) }  
        </Row>
    )
}

export default BodySection

import React, { useState } from 'react'
import { Row, Col, Badge, Button, ButtonGroup } from 'react-bootstrap'
import SectionBook from './SectionBook'

/** 
 * Componente para criar no corpo da pagina seções com os 
 * ultimos livros lidos, para devolver, favoritos e sugestões
 */
function SectionSubject(props) {
    const dispOptions = [
        { layout: 'list', icon: 'list' }, 
        { layout: 'grid', icon: 'th' }
    ]
    
    // PROPS
    const { title, icon, iconColor, items, note, variant, bodyStyle } = props
    
    // STATE
    const [layout, setLayout] = useState(dispOptions[1].layout)

    // FUNCTIONS
    /** Atua na mudança de layout visualização */
    const changeLayout = (lyt) => {
        console.log('changeLayout', lyt)
        if (layout !== lyt) {
            setLayout(lyt)
        }
    }

    /** Retorna uma nota de aviso sobre o item */
    const renderNoteText = (idx) => (
        <Badge variant={variant}>
            {note.join(` ${idx} `) }
        </Badge>
    )
    
    // Variáveis de estilos
    const contentStyle = {
        ...(bodyStyle ? bodyStyle : {})
    }
    const titleCont = {
        alignItems:'center'
    }
    const iconStyle = {
        fontSize: '1.4rem',
        color: iconColor
    }

    return (
        <Col xs={12} lg={6} className="p-0 mb-2 sectionContainer">
        
            <Row className="p-2 m-0 section-title">
                
                <ButtonGroup aria-label="Layout change" className="subject-layout-icon" >
                    { dispOptions.map( opt => {
                        const keyBtn = `btn-layout-${opt.layout}`
                        const isActive = (opt.layout === layout)
                        return (
                            <Button 
                                key={keyBtn}
                                size="sm"
                                className=""
                                disabled={isActive ? true : false}
                                variant="outline"
                                active={isActive}
                                title={`Alterar para '${opt.layout}'`} 
                                onClick={() => changeLayout(opt.layout)} 
                            >
                                <i className={`fa fa-${opt.icon}`}></i> 
                            </Button>
                        )
                    }) }
                </ButtonGroup>

                <div className="m-0 row" style={titleCont}>
                    <i className={`fa fa-${icon}`} style={iconStyle}></i> 
                    &nbsp;
                    <h5 className="m-0">
                        { title }
                    </h5>
                </div>
            </Row>

            <Row className="p-2 m-0 section-content" style={contentStyle}>
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
            
        </Col>
    )
}

export default SectionSubject

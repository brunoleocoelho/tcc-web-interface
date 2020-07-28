import React, { useState } from 'react'
import { Row, Col, Badge, Button, ButtonGroup } from 'react-bootstrap'
import SectionBook from './SectionBook'

// Modos de layout aplicados
const dispOptions = [
    { layout: 'list', icon: 'list' }, 
    { layout: 'grid', icon: 'th' }
]

/** 
 * Componente para criar no corpo da pagina seções com os 
 * ultimos livros lidos, para devolver, favoritos e sugestões
 */
function SectionSubject(props) {
    // PROPS
    const { title, theme } = props
    
    // STATE
    const [layout, setLayout] = useState(dispOptions[1].layout)

    // FUNCTIONS
    /** Atua na mudança de layout visualização */
    const changeLayout = (lyt) => {
        console.log('changeLayout', lyt)
        if (layout !== lyt) setLayout(lyt)
    }

    const idSection = "section-subject-"+ title.replace(" ","-")
    const idInner = "section-inner-"+ title.replace(" ","-")

    return (
        <Col id={idSection} xs={12} lg={6} className="p-2 mb-2 sectionContainer" >

            <div id={idInner} className="section-inner p-2" style={theme.fourth}>
                <HeaderSection {...{
                    ...props, 
                    changeLayout, 
                    layout,
                    theme
                }} />

                <BodySection {...{
                    ...props, 
                    layout, 
                    theme
                }} />
            </div>
            
        </Col>
    )
}

/**
 * Header para o SectionSubject
 */
function HeaderSection({ title, icon, iconColor, layout, changeLayout, theme }) {
    const titleCont = {
        alignItems:'center'
    }
    const iconStyle = {
        fontSize: '1.4rem',
        color: iconColor
    }
    const idHeader = "section-header-"+ title.replace(" ","-")

    return (
        <Row id={idHeader} className="section-header p-2 m-0">
            <ButtonGroup
                aria-label="Layout change" 
                className="subject-layout-icon" 
            >
                { dispOptions.map( opt => {
                    const keyBtn = `btn-layout-${opt.layout}`
                    const isActive = (opt.layout === layout)
                    
                    return (
                        <Button 
                            key={keyBtn}
                            size="sm"
                            style={theme.fourth}
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
    )
}

/**
 * Body para o conteúdo do Section Subject
 */
function BodySection({ title, items, note, variant, bodyStyle, layout }) {
    const contentStyle = {
        ...(bodyStyle ? bodyStyle : {})
    }
    const idBody = "section-body-"+ title.replace(" ","-")

    /** Retorna uma nota de aviso sobre o item */
    const renderNoteText = (idx) => (
        <Badge variant={variant}>
            {note.join(` ${idx} `) }
        </Badge>
    )

    return (
        <Row id={idBody} className="p-2 m-0 section-content" style={contentStyle}>
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

export default SectionSubject

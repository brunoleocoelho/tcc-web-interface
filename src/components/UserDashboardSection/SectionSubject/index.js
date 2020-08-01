import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import HeaderSection from './HeaderSection'
import BodySection from './BodySection'

import './SectionSubject.css'

// Modos de layout aplicados
const dispOptions = [
    { layout: 'list', icon: 'list' }, 
    { layout: 'grid', icon: 'th' }
]

/** 
 * Componente para criar seções no corpo da pagina com os 
 * ultimos livros lidos, devolvuções, favoritos e sugestões
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

    const idSection = "section-wrapper-"+ title.replace(" ","-")
    const idInner = "section-inner-"+ title.replace(" ","-")
    const mntProps = {...props, changeLayout, layout, theme, dispOptions}

    return (
        <Col id={idSection} xs={12} lg={6} className="section-wrapper p-2 mb-2">
            <SectionInner id={idInner} theme={theme.fourth}>
                <HeaderSection {...mntProps} />
                <BodySection {...mntProps} />
            </SectionInner>
        </Col>
    )
}

// Container interno (inner) para SectionSubject
function SectionInner({ id, theme, children }) {
    return (
        <div 
            id={id}
            style={theme}
            className="section-inner p-2"
        >
            { children }
        </div>
    )
}

export default SectionSubject

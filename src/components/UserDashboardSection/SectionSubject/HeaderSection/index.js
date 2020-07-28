import React from 'react'
import { Row, Button, ButtonGroup } from 'react-bootstrap'
import './HeaderSection.css'

/**
 * Header para o SectionSubject
 */
function HeaderSection({ title, icon, iconColor, layout, changeLayout, theme, dispOptions }) {
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

export default HeaderSection

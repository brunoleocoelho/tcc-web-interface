import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap';
import { setTitleBarText } from '../../services/InterfaceService'
import CustomThemeContext from '../../services/CustomThemeContext'
import EmptyContent from '../EmptyContent';
import './ContentWrapper.css'

/**
 * Envolve uma página da aplicação
 */
function ContentWrapper({ title, actions, applyTheme, isLoading, children }) {
    setTitleBarText(title)

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    if (isLoading) return <div>It's loading!!!</div>

    const titLwr = String(title).replace(' ', '').toLowerCase()
    const idwrapper = `wrapper-${titLwr}`
    const idHeader = `header-${titLwr}`
    const idSection = `section-${titLwr}`
    const themeApply = applyTheme ? theme.primary : {}

    return (
        <div id={idwrapper} className="content-wrapper col" style={themeApply}>
            <header id={idHeader}>
                <h3>{ title }</h3> 
                <div className="action">
                    { actions && actions.map((item, idx) => {
                        return (
                            <Button
                                key={`h-btn-${item.label}-${idx}`}
                                onClick={item.onClick ? item.onClick : null}
                                variant={item.variant? item.variant : `primary`}
                                href={item.href ? item.href : null}
                            >
                                { item.icon && <i className={`fa fa-fw fa-${item.icon}`}></i> }
                                { item.label}
                            </Button>
                        )
                    }) }
                </div>
            </header>
            <section id={idSection}>
                { children }
            </section>
        </div>
    )
}

ContentWrapper.defaultProps = {
    title: '',
    actions: [],
    applyTheme: false,
    isLoading: false,
    children: <EmptyContent />
}

export default ContentWrapper

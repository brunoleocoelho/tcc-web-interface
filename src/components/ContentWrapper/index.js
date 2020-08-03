import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import { setTitleBarText } from '../../services/InterfaceService'
import CustomThemeContext from '../../services/CustomThemeContext'
import EmptyContent from '../EmptyContent';
import './ContentWrapper.css'
import PageActions from '../PageActions';

/**
 * Envolve uma página da aplicação
 */
function ContentWrapper({ title, actions, applyTheme, isLoading, children }) {
    setTitleBarText(title)

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    if (isLoading) return <div>It's loading!!!</div>

    // identificadores
    const titLwr = String(title).replace(' ', '-').toLowerCase()
    const idwrapper = `content-wrapper-${titLwr}`
    const idHeader = `header-${titLwr}`
    const idSection = `section-${titLwr}`
    const themeApply = applyTheme ? theme.primary : {}

    return (
        <div id={idwrapper} className="content-wrapper col" /* style={themeApply} */>

            <header id={idHeader}>
                <h3>{ title }</h3> 
                <PageActions actions={actions} />
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
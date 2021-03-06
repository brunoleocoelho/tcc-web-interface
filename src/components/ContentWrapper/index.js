import React from 'react'
import EmptyContent from '../EmptyContent';
import './ContentWrapper.css'
import PageActions from '../PageActions';

/**
 * Envolve uma página da aplicação
 */
function ContentWrapper({ title, subtitle, actions, applyTheme, children }) {
    // identificadores
    const idwrapper = `content-wrapper`
    const idHeader = `content-header`
    const idSection = `content-section`

    return (
        <div id={idwrapper} className="content-wrapper col" /* style={themeApply} */>

            <header id={idHeader}>
                <div>
                    <h3>{ title }</h3> 
                    <h6 className="text-muted">{ subtitle }</h6>
                </div>
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
    subtitle: '',
    actions: [],
    applyTheme: false,
    isLoading: false,
    children: <EmptyContent />
}

export default ContentWrapper

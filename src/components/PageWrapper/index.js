import React from 'react'
import EmptyContent from '../EmptyContent'
import './PageWrapper.css'

/**
 * Container principal com layout default de uma página
 */
function PageWrapper({ title, children }) {
    const idPage = `page-${title.replace(' ','-').toLowerCase()}`
    return (
        <div id={idPage} className="page-wrapper">

            {/* <Breadcrumb > */}
            <div style={{
                display:"block",
                // backgroundColor:"white",
                fontFamily: 'monospace',
                padding: 5
            }}>
                <small> {`Home > ${title}`} </small>
            </div>
            
            { children }
        </div>
    )
}

PageWrapper.defaultProps = {
    title: 'Page', 
    children: <EmptyContent />
}

export default PageWrapper

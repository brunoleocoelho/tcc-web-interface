import React, { useContext } from 'react'
import EmptyContent from '../EmptyContent'
import './PageWrapper.css'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'

/**
 * Container principal com layout default de uma página
 */
function PageWrapper({ title, applyTheme, children }) {

    const { theme } = useContext(CustomThemeContext)
    const user = getUser()
    const idPage = `page-wrapper`
    const themeApply = applyTheme ? theme.primary : {}

    return (
        <div id={idPage} className="page-wrapper" style={user && themeApply}>
            {/* <BreadcrumbCustom
                theme={theme.third} 
                current={title}
            /> */}
            { children }
        </div>
    )
}


function BreadcrumbCustom({ current, theme }){
    return (
        <div style={{
            display:"block",
            // backgroundColor:"white",
            fontFamily: 'monospace',
            padding: '0.25rem 1rem',
            ...(theme || {})
        }}> 
            <small> {`Home > ${current}`} </small>
        </div>
    )
}

PageWrapper.defaultProps = {
    title: 'Page', 
    applyTheme: false, 
    children: <EmptyContent />
}

export default PageWrapper

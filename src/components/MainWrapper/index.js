import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { getUser } from '../../services/AuthenticationService'
import CustomThemeContext from '../../services/CustomThemeContext'
import SideMenu from '../SideMenu'
import EmptyContent from '../EmptyContent'
import './MainWrapper.css'
import Footer from '../Footer'

/**
 * Envolve toda a aplicação disponibilizando
 * recursos como `<SideMenu />`
 */
function MainWrapper(props) {
    // console.log(props)
    const user = getUser()
    
    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    const pageContentCss = [
        'main-content footer-offset',
        (user ? 'col-12 col-md-9 col-xl-10' : '')
    ].join(' ')

    return (
        <div id="main-wrapper" className="main-wrapper "/*  style={theme.primary} */>
            { user && <SideMenu {...props}/>}
            <div id="page-content" className={pageContentCss} >
                { props.children }
            </div>
            <Footer />
        </div>
    )
}

MainWrapper.defaultProps = {
    children: <EmptyContent />
}

export default withRouter(MainWrapper)

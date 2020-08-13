import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { getUser } from '../../services/AuthenticationService'
import CustomThemeContext from '../../services/CustomThemeContext'
import SideMenu from '../SideMenu'
import EmptyContent from '../EmptyContent'
import './MainWrapper.css'
import Footer from '../Footer'
import ThemeButton from '../ThemeButton'

/**
 * Envolve toda a parte principal da aplicação
 * disponibilizando recursos como `<SideMenu/>` e `<Footer/>`
 */
function MainWrapper(props) {
    const user = getUser()

    const { theme } = useContext(CustomThemeContext)

    const pageContentCss = [
        'main-content footer-offset',
        (user ? 'col-12 col-md-9 col-xl-10' : '')
    ].join(' ')

    return (
        <div id="main-wrapper" className="main-wrapper" style={user && theme.primary}>
            { user && <SideMenu {...props}/>}
            
            <div id="main-page-content" className={pageContentCss} >
                { props.children }
            </div>
            
            {user && <>
                <ThemeButton />
                {/* <Footer /> */}
            </>}
        </div>
    )
}

MainWrapper.defaultProps = {
    children: <EmptyContent />
}

export default withRouter(MainWrapper)

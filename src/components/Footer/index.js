import React, { useContext } from 'react'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Footer.css'

/**
 * Componente que renderiza um rodapé da aplicação
 */
function Footer() {
    const user = getUser()

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    // if (!user) return null

    const itensFooter = [
        {
            group: 'Coluna 0',
            items: [
                { label: 'Biblioteca', href: '/' },
                { label: 'Sobre', href: '/sobre' }
            ]
        },
        {
            group: 'Coluna 2',
            items: [
                { label: 'Biblioteca', href: '/' },
                { label: 'Sobre', href: '/sobre' }
            ]
        },
        {
            group: 'Coluna 3',
            items: [
                { label: 'Biblioteca', href: '/' },
                { label: 'Sobre', href: '/sobre' }
            ]
        },
    ]

    const appFooterCss = [
        'footer-offset',
        (user ? 'col-12 col-md-9 col-xl-10' : '')
    ].join(' ')

    return (
        <div id="app-footer" className={appFooterCss}>
            <Row className="row-footer" style={theme.second}>
                { itensFooter.map( (grp, k) => (
                    <div className="col-12 col-md-4" key={`grp-${k}`}>
                        { grp.group }
                        <ul className="">
                        {
                            grp.items.map((item, key) => {
                                const keyToUse = `footer-${key}-${item.label.replace(' ', '-')}`
                                return <Link to={item.href} key={keyToUse} className="link-footer">
                                    { item.label }
                                </Link>
                            })
                        }
                        </ul>
                    </div>
                )) }
            </Row>
        </div>
    )
}

export default Footer

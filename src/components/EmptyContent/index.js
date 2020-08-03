import React, { useContext } from 'react'
import './EmptyContent.css'
import CustomThemeContext from '../../services/CustomThemeContext'

function EmptyContent({ message, icon }) {
    // CONTEXT
    const { theme } = useContext( CustomThemeContext )

    return (
        <div className="empty-full" style={{ color: theme.fourth.color }}>
            <h4>
                <i className={`fa fa-fw fa-${icon}`}></i>
                { message }
            </h4>
        </div>
    )
}

EmptyContent.defaultProps = {
    message: 'Não há nada para mostrar...',
    icon: 'smile-o'
}

export default EmptyContent

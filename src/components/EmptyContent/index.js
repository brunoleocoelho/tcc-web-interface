import React, { useContext } from 'react'
import './EmptyContent.css'
import CustomThemeContext from '../../services/CustomThemeContext'

function EmptyContent() {
    // CONTEXT
    const { theme } = useContext( CustomThemeContext )

    return (
        <div className="empty-full" style={{color: theme.fourth.color}}>
            <h4>
                <i className="fa fa-fw fa-smile-o"></i>
                Não há nada para mostrar...
            </h4>
        </div>
    )
}

export default EmptyContent

import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { getUser } from '../../services/AuthenticationService'
import Avatar from '../Avatar'
import CustomThemeContext from '../../services/CustomThemeContext'
import './UserSummaryCard.css'

/**
 * Componente que mostra um breve resumo de quantidade de
 * livros lidos, para entregar e os favoritos do usuário
 */
function UserSummaryCard() {
    const user = getUser()

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)
    
    if (!user) return null

    const itens = [
        { label: 'Lidos', qtd: 8, color: 'success', icon: 'bookmark' },
        { label: 'Entregar', qtd: 8, color: 'danger', icon: 'warning' },
        { label: 'Favoritos', qtd: 8, color: 'info', icon: 'star' },
    ]

    return (
        <div id="user-summary" className="user-summary" style={theme.primary}>
            <Card className="user-card" style={theme.second}>
                <Card.Header className="user-header">
                    <Avatar userImg={user.profileImg} />
                </Card.Header>

                <Card.Body className="user-body">
                    <h5>{`${user.name} ${user.lastName}`}</h5>
                    
                    <small>{ user.role }</small>
                </Card.Body>
            </Card>

            <div className="user-statuses" style={theme.second} >
                { itens.map( item => {
                    const keyItem = `key-status-${item.label.replace(" ","-")}`

                    return <StatusOneUser key={keyItem} {...item} />
                }) }
            </div>
        </div>
    )
}

function StatusOneUser({ label, icon, qtd, color }) {
    const id = `status-one-${label.replace(" ","-")}`
    
    return (
        <div id={id} className="status-one text-muted">
            <strong className={`qtd-status text-${color}`}>
                <i className={`text-${color} fa fa-fw fa-${icon}`}></i>
                { qtd }
            </strong>
        </div>
    )
}

export default UserSummaryCard

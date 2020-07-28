import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getUser } from '../../services/AuthenticationService'
import Avatar from '../Avatar'
import CustomThemeContext from '../../services/CustomThemeContext'
import './UserSummaryHeader.css'

/**
 * Componente que mostra um breve resumo de quantidade de
 * livros lidos, para entregar e os favoritos do usuário
 */
function UserSummaryHeader() {
    const user = getUser()

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    const itens = [
        { label: 'Lidos', qtd: 8, color: 'success', icon: 'bookmark' },
        { label: 'Entregar', qtd: 8, color: 'danger', icon: 'warning' },
        { label: 'Favoritos', qtd: 8, color: 'info', icon: 'star' },
    ]

    return (
        <Row id="user-summary" className="p-2 m-0" style={theme.primary}>
            <Col xs={3} md={1} >
                <Avatar />
            </Col>
            <Col xs={9} md={4}>
                <h5 className="m-0">{`${user.name} ${user.lastName}`} </h5>
                <small className="text-muted text-capitalize">{ user.role }</small>
            </Col>

            <Col className="d-flex justify-content-between align-items-center">
                { itens.map( item => {
                    const keyItem = `key-status-${item.label.replace(" ","-")}`
                    const idItem = `status-one-${item.label.replace(" ","-")}`

                    return <StatusOneUser key={keyItem} id={idItem} {...item} />
                }) }
            </Col>            
        </Row>
    )
}

function StatusOneUser({ id, label, icon, qtd, color }) {
    return (
        <div id={id} className="status-one text-muted">
            <strong className={`qtd-status order-2 order-md-1 order-xl-2 text-${color}`}>
                { qtd }
            </strong>
            <div className="order-1 order-md-2 order-xl-1 m-1 flex-column flex-md-row">
                <i className={`text-${color} fa fa-${icon}`}></i>
                {' '}
                <strong className={`d-none d-md-inline text-${color}`}>
                    { label }
                </strong>
            </div>
        </div>
    )
}

export default UserSummaryHeader

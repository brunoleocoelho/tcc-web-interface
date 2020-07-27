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

    return (
        <Row className="p-2 m-0" style={theme.fourth}>
            <Col xs={3} md={1} >
                <Avatar />
            </Col>
            <Col xs={9} md={4}>
                <h5 className="m-0">{`${user.name} ${user.lastName}`} </h5>
                <small className="text-muted text-capitalize">{ user.role }</small>
            </Col>

            <Col className="d-flex justify-content-between align-items-center">
                <div className="status-one text-muted">
                    <strong className="qtd-status order-2 order-md-1 text-success">8</strong>
                    <div className="order-1 order-md-2 m-1 flex-column flex-md-row">
                        <i className="text-success fa fa-bookmark"></i>{' '}
                        <strong className="d-none d-md-inline text-success">Lidos</strong>
                    </div>
                </div>
                <div className="status-one text-muted">
                    <strong className="qtd-status order-2 order-md-1 text-warning">8</strong>
                    <div className="order-1 order-md-2 m-1 flex-column flex-md-row">
                        <i className="text-warning fa fa-warning"></i>{' '}
                        <strong className="d-none d-md-inline text-warning">Entregar</strong>
                    </div>
                </div>
                <div className="status-one text-muted">
                    <strong className="qtd-status order-2 order-md-1 text-info">8</strong>
                    <div className="order-1 order-md-2 m-1 flex-column flex-md-row">
                        <i className="text-info fa fa-star"></i>{' '}
                        <strong className="d-none d-md-inline text-info">Favoritos</strong>
                    </div>
                </div>
            </Col>
            
        </Row>
    )
}

export default UserSummaryHeader

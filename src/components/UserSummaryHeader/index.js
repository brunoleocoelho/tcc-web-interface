import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { getUser } from '../../services/AuthenticationService'
import Avatar from '../Avatar'

/**
 * Componente que mostra um breve resumo de quantidade de
 * livros lidos, para entregar e os favoritos do usuário
 */
function UserSummaryHeader() {
    const user = getUser()

    return (
        <Row className="p-3 m-0 bg-light">
            <Col xs={3} md={1} >
                <Avatar />
            </Col>
            <Col xs={9} md={4}>
                <h5 className="m-0">{`${user.name} ${user.lastName}`} </h5>
                <small className="text-muted text-capitalize">{ user.role }</small>
            </Col>

            <Col className="d-flex justify-content-between">
                <div className="text-muted">
                    <i className="text-success fa fa-bookmark"></i>{' '}
                    <strong className="text-success">Lidos: 8</strong>
                </div>
                <div className="text-muted">
                    <i className="text-warning fa fa-warning"></i>{' '}
                    <strong className="text-warning">Entregar: 8</strong>
                </div>
                <div className="text-muted">
                    <i className="text-info fa fa-star"></i>{' '}
                    <strong className="text-info">Favoritos: 8</strong>
                </div>
            </Col>
            
        </Row>
    )
}

export default UserSummaryHeader

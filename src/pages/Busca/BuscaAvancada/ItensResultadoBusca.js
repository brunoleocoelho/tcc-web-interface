import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './BuscaAvancada.css'

/**
 * Modelo do item de resultado da página de busca
 */
function ItensResultadoBusca({ items }) {
    return (
        items.map((item, idx) => {
            const { id, title, author, category, image_url } = item
            
            const link = `/livros/info/${id}/view`
            return (
                <Link 
                    to={link}
                    key={`link-${idx}`}
                    className="item-result-busca" 
                >
                    <Row className="item-result-row">
                        <Col xs={2} className="img-col">
                            <img src={image_url} width={50} alt={title} />
                        </Col>
                        <Col>
                            <h6 className="title">
                                {title}
                            </h6>
                            <div className="info text-muted">
                                {author} - {category}
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                </Link>
            )
        })
        
    )
}

ItensResultadoBusca.defaultProps = {
    items: []
}

export default ItensResultadoBusca

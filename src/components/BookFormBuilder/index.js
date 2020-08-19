import React, { useContext } from 'react'
import { Form, Col } from 'react-bootstrap'
import CustomThemeContext from '../../services/CustomThemeContext'

import './BookFormBuilder.css'

/** Constrói um Form de livros baseado nas props */
function BookFormBuilder(props) {
    // props
    const { form } = props

    //CONTEXT
    const { theme } = useContext(CustomThemeContext)   

    return (
    <Form className="book-form-builder">
        <Form.Row>
            { form.map((item, i) => {
                const {fields, edit, ...other} = item
                const styleApply = (!edit) ? theme.second : {}
                const keyCol = item.key || `form-item-${i}`
                
                return (
                    <Col {...other} key={keyCol}>
                        { fields.map((field, j) => {
                            const { groups } = field
                            const keyFields = field.key || `form-field-${i}-${j}`
                            
                            return (
                                <Form.Row key={keyFields} >
                                    { groups.map((group, k) => {
                                        const { sm, label, type, ...otherGrp } = group
                                        const keyGrp = group.key || `form-group-${j}-${k}`
                                        
                                        switch (type) {
                                            case 'file':
                                                const { src, imgRef, ...otherFile } = otherGrp
                                                return (
                                                    <Form.Group className="image-book" key={keyGrp}>
                                                        <img ref={imgRef} id="imgbook" src={src} alt="" />
                                                        { (edit) &&
                                                            <Form.File {...otherFile} />
                                                        }
                                                    </Form.Group>
                                                )    
                                        
                                            default:
                                                return (
                                                    <Form.Group as={Col} sm={sm} key={keyGrp} >
                                                        <Form.Label>{ label }</Form.Label>
                                                        <Form.Control
                                                            type={type} 
                                                            style={styleApply}
                                                            readOnly={(!edit)}
                                                            {...otherGrp}
                                                        />
                                                    </Form.Group> 
                                                )
                                        }
                                        /* // campo de imagem
                                        if (type === 'file') {
                                            const { src, imgRef, ...otherFile } = otherGrp
                                            return (
                                                <Form.Group className="image-book" key={keyGrp}>
                                                    <img ref={imgRef} id="imgbook" src={src} alt="" />
                                                    { (edit) &&
                                                        <Form.File {...otherFile} />
                                                    }
                                                </Form.Group>
                                            )
                                        }
                                        // Outros campos
                                        else {
                                            return (
                                                <Form.Group as={Col} sm={sm} key={keyGrp} >
                                                    <Form.Label>{ label }</Form.Label>
                                                    <Form.Control
                                                        type={type} 
                                                        style={styleApply}
                                                        readOnly={(!edit)}
                                                        {...otherGrp}
                                                    />
                                                </Form.Group> 
                                            )
                                        } */
                                    }) }
                                </Form.Row>
                            )
                        }) }
                    </Col>
                )

            })}
        </Form.Row>
    </Form>
    )
}

export default BookFormBuilder

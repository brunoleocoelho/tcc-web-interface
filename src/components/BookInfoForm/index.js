import React, { useState, useEffect, useContext, useRef } from 'react'
import { connect } from 'react-redux'
import { Form, Col } from 'react-bootstrap'
import CustomThemeContext from '../../services/CustomThemeContext'
import { getUser } from '../../services/AuthenticationService'

import './BookInfoForm.css'

/** Form de informação de livros */
function BookInfoForm(props) {
    // console.log("=== BookInfoForm", props)

    const user = getUser()
    const isStudent = (user.role === 'estudante')

    //CONTEXT
    const { theme } = useContext(CustomThemeContext)

    // STATE
    const [book, setBook] = useState(props.book)
    const [toEdit, setToEdit] = useState(props.edit)
    const [msgImg, setMsgImg] = useState('')

    // REF
    const imgRef = useRef()

    // verifica se houve modificações de edição
    const checkChanges = () => {
        // Verifcando igualdade simples dos objetos
        const bookProps = JSON.stringify(props.book)
        const bookHere = JSON.stringify(book)
        const isEqual = (bookProps === bookHere);

        const goAhead = isEqual || window.confirm("As modificações serão perdidas. Continuar?")

        return goAhead
    }

    // function que habilita editar item
    const handleToEdit = () => {
        if (toEdit !== props.edit) {
            const goAhead = checkChanges()
            if (!goAhead) return
            setBook(props.book)
            setToEdit(!toEdit)
            setMsgImg('')
        }
    }

    // manuseia as alterações nos campos
    const handleOnChange = (e) => {
        const prop = e.target.name
        const value = e.target.value
        setBook({...book, [prop]: value})
    }

    // manueria a alteração da imagem
    const imgTypes = ["image/bmp","image/jpeg","image/png"]
    const handleImg = (e) => {
        const inputFile = e.target
        const prop = inputFile.name
        const files = inputFile.files
        console.log("handleImg", {inputFile, files, imgRef})
        
        const imgFile = files['0']
        const isValid = imgTypes.includes(imgFile.type)
        if (!isValid) {
            setMsgImg(`O formato '${imgFile.type}' do arquivo '${imgFile.name}' é inválido!.`)
            return
        }
        if (imgRef) {
            const imgUrl = URL.createObjectURL(imgFile)
            imgRef.current.src = imgUrl
            setBook({...book, [prop]: imgUrl})
            setMsgImg(`Nova imagem '${imgFile.name}'.`)
        }
    }

    // CDU
    useEffect(handleToEdit, [props.edit])

    if (!book) return null

    // estilo dos inputs
    const styleApply = (!toEdit) ? theme.second : {}

    const bookForm = [
        {
            sm: "3",
            fields: [{
                groups: [{
                    type: 'file',
                    label: (
                        <div className="inner-btn">
                            <i className="fa fa-fw fa-file-image-o"/>
                            Trocar imagem
                        </div>
                    ),
                    disabled: (!toEdit),
                    name: 'image_url',
                    id: 'image-upload',
                    accept: imgTypes.join(','),
                    onChange: handleImg,
                    multiple: false,
                    src: book.image_url
                }]
            }]
        },
        {
            fields: [{
                groups: [{
                    type: 'text',
                    label: 'Id',
                    name: 'id',
                    id: 'id',
                    value: book.id,
                    sm: "3"
                },{
                    type: 'text',
                    label: 'Titulo',
                    name: 'title',
                    id: 'title',
                    value: book.title,
                    sm: "9"
                }]
            },{
                groups: [{
                    type: 'text',
                    label: 'Subtítulo',
                    name: 'subtitle',
                    id: 'subtitle',
                    value: book.subtitle
                }]
            },
            {
                groups: [{
                    type: 'text',
                    label: 'Autor',
                    name: 'author',
                    id: 'author',
                    value: book.author,
                    sm: "6"
                },{
                    type: 'text',
                    label: 'Editora',
                    name: 'publisher',
                    id: 'publisher',
                    value: book.publisher,
                    sm: "6"
                }]
            },
            {
                groups: [{
                    type: 'text',
                    label: 'Categoria',
                    name: 'category',
                    id: 'category',
                    value: book.category,
                    sm: "6"
                },{
                    type: 'text',
                    label: 'ISBN',
                    name: 'isbn',
                    id: 'isbn',
                    value: book.isbn,
                    sm: "6"
                }]
            },
            {
                groups: [{
                    type: 'text',
                    label: 'Ano Publicação',
                    name: 'publication_year',
                    id: 'publication_year',
                    value: book.publication_year,
                    sm: "4"
                },{
                    type: 'text',
                    label: 'Local Publicação',
                    name: 'publication_place',
                    id: 'publication_place',
                    value: book.publication_place,
                    sm: "4"
                },{
                    type: 'text',
                    label: 'Edição',
                    name: 'edition',
                    id: 'edition',
                    value: book.edition,
                    sm: "4"
                }]
            },
            {
                groups: [{
                    as: 'textarea',
                    label: 'Descrição',
                    name: 'description',
                    id: 'description',
                    value: book.description,
                    rows: '4',
                }]
            },
            {
                groups: [{
                    type: 'text',
                    label: 'Palavras-chave',
                    name: 'keywords',
                    id: 'keywords',
                    value: book.keywords,
                }]
            }]
        }
    ]
    
    return (
    <Form className="book-info-form">
        <Form.Row>
            { bookForm.map((item, i) => {
                const {fields, ...other} = item

                return (
                    <Col {...other} key={'item-'+i}>
                        { fields.map((field, j) => {
                            const { groups } = field

                            return (
                                <Form.Row key={'fields-'+j} >
                                    { groups.map((group, k) => {
                                        const { sm, label, type, ...otherGrp } = group

                                        // campo de imagem
                                        if (type === 'file') {
                                            const { src, ...otherFile } = otherGrp
                                            return (
                                                <Form.Group className="image-book" key={'group-'+k}>
                                                    <img ref={imgRef} id="imgbook" src={src} alt="" />
                                                    { (!isStudent && toEdit) &&
                                                        <Form.File {...otherFile} />
                                                    }
                                                    
                                                    <Form.Text>
                                                        <small>{ msgImg }</small>
                                                    </Form.Text>
                                                </Form.Group>
                                            )
                                        }

                                        // Outros campos
                                        return (
                                            <Form.Group as={Col} sm={sm} key={'group-'+k} >
                                                <Form.Label>{ label }</Form.Label>
                                                <Form.Control
                                                    type={type} 
                                                    style={styleApply}
                                                    readOnly={(!toEdit)}
                                                    onChange={handleOnChange}
                                                    {...otherGrp}
                                                />
                                            </Form.Group> 
                                        )
                                    })}
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

// REDUX
const mapStateToProps = ({ data, getinfo }) => ({
    data,
    getinfo
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoForm)

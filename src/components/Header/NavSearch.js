import React, { useState, useEffect, useRef } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import AutosuggestSearch from '../AutosuggestSearch'

function NavSearch() {
    const [showInput, setShowInput] = useState(false)
    const [term, setTerm] = useState('')

    const inputRef = useRef()

    const handleSearch = (e) => {
        // console.log("handleSearch", term, '->', e.target.value, inputRef)
        setTerm(e.target.value)
    }

    const handleShowInput = (e) => {
        // console.log("handleShowInput", showInput, '->', !showInput, inputRef)
        setShowInput(!showInput)
    }
    
    useEffect(() => {
        if (!showInput) inputRef.current.focus()
    }, [showInput])

    // Em telas maiores que sm, input é mostrado, e botão de busca é oculto
    // Em telas menoresde modo que o exibindo, a busca pode ser efetuada
    const containerCss = [
        'm-0 order-2 order-lg-3 position-static',
        (showInput ? 'col-12' : ''),
        'col-md-5'
    ].join(' ')
    
    // CSS Button
    const btnColStyle = {...styles.btnRegular, ...(showInput ? styles.btnShowInput : {})}
    const btnColCss = [
        'text-center mx-0 px-0 d-md-none',
        (showInput ? 'col-0' : '')
    ]
    
    // CSS Input
    const inputColCss = `d-md-flex ${showInput ? 'w-100' : 'd-none'}`

    return (
        <div className={containerCss} >
            <Form>
                <Form.Row>
                    <Col xs={2} className={btnColCss} style={btnColStyle}>
                        <Button 
                            variant="dark" 
                            className="py-2 pl-2"
                            onClick={handleShowInput}
                        >
                            <i className={'fa fa-fw fa-search'}></i>
                        </Button>
                    </Col>

                    <Col className={inputColCss} style={styles.inputCol}>
                        <AutosuggestSearch
                            inputRef={inputRef}
                            value={term}
                            onChangeText={handleSearch}
                            closeAction={handleShowInput} />
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}

// ESTILOS CUSTOMIZADOS
const styles = {
    inputCol: {
        // flexGrow:1
    },
    btnRegular: {
        position: 'absolute',
        right: 0,
        top: 8,
    },
    btnShowInput : {
        display: 'none'
    },
}

export default NavSearch

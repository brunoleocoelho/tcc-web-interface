import React, { useState, useEffect, useRef } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import AutosuggestSearch from '../AutosuggestSearch'

function NavSearch(props) {
    // PROPS
    const { theme } = props

    // STATE
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
    
    // componentDidUpdate
    useEffect(() => {
        if (!showInput) inputRef.current.focus()
    }, [showInput])

    // Em telas maiores que sm, input é mostrado, e botão de busca é oculto
    // Em telas menores de modo que o exibindo, a busca pode ser efetuada
    const containerCss = [
        'm-0 order-2 order-lg-3 position-static',
        (showInput ? 'col-12' : ''),
        'col-md-5'
    ].join(' ')
    
    // CSS Button
    // const btnColStyle = (showInput ? styles.btnShowInput : {})
    const btnColCss = [
        'btn-search-regular text-center mx-0 px-0 d-md-none',
        (showInput ? 'btn-search-hide' : '')
    ].join(' ')
    
    // CSS Input
    const inputColCss = `d-md-flex ${showInput ? 'w-100' : 'd-none'}`

    return (
        <div className={containerCss} >
            <Form>
                <Form.Row>
                    <div className={btnColCss} /* style={btnColStyle} */>
                        <Button 
                            variant={theme} 
                            onClick={handleShowInput}
                        >
                            <i className="fa fa-search"></i>
                        </Button>
                    </div>

                    <Col xs={12} className={inputColCss} style={styles.inputCol}>
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
        right: '2.5rem',
        top: 10,
    },
    btnShowInput : {
        display: 'none'
    },
}

export default NavSearch

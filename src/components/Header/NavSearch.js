import React, { useState, useEffect, useRef } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import AutosuggestSearch from '../AutosuggestSearch'
import './NavSearch.css'

function NavSearch(props) {
    // PROPS
    const { theme } = props

    // STATE
    const [showInput, setShowInput] = useState(false)
    const [term, setTerm] = useState('')

    const inputRef = useRef()

    const handleSearch = (e) => {
        setTerm(e.target.value)
    }

    const handleShowInput = (e) => {
        setShowInput(!showInput)
    }
    
    // componentDidUpdate
    useEffect(() => {
        if (!showInput) inputRef.current.focus()
    }, [showInput])

    // Em telas maiores que sm, input é mostrado, e botão de busca é oculto
    // Em telas menores de modo que o exibindo, a busca pode ser efetuada
    // const containerCss = [
    //     'm-0 order-2 position-static',
    //     (showInput ? 'col-12' : ''),
    //     'col-md-5'
    // ].join(' ')
    
    // CSS Button
    // const btnColStyle = (showInput ? styles.btnShowInput : {})
    const btnColCss = [
        'btn-search-regular text-center mx-0 px-0 d-md-none',
        (showInput ? 'btn-search-hide' : '')
    ].join(' ')
    
    // CSS Input
    const inputColCss = `d-md-flex ${showInput ? 'input-search-show' : 'input-search-hide'}`

    return (
        <Form className="order-md-4">
            <Form.Row>
                <div className={btnColCss} /* style={btnColStyle} */>
                    <Button 
                        variant={theme} 
                        onClick={handleShowInput}
                    >
                        <i className="fa fa-search"></i>
                    </Button>
                </div>

                <div id="search-suggest" className={inputColCss}>
                    <AutosuggestSearch
                        inputRef={inputRef}
                        value={term}
                        onChangeText={handleSearch}
                        closeAction={handleShowInput} />
                </div>
            </Form.Row>
        </Form>
    )
}

// ESTILOS CUSTOMIZADOS
const styles = {
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

import React, { useState, useEffect, useRef, useContext } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import AutoSuggestSearch from '../../AutoSuggestSearch'
import CustomThemeContext from '../../../services/CustomThemeContext'
import './NavSearch.css'

function NavSearch(props) {
    // console.log('NavSearch', props)

    // STATE
    const [showInput, setShowInput] = useState(false)

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    const handleShowInput = (e) => {
        setShowInput(!showInput)
    }
    
    // CSS Button
    const btnColCss = [
        'btn-search-regular',
        (showInput ? 'btn-search-hide' : '')
    ].join(' ')
    
    // CSS Input
    const inputColCss = [
        'd-md-flex',
        (showInput ? 'input-search-show' : 'input-search-hide')
    ].join(' ')

    return (
        <Form id="navserch-form" className="order-md-4">
            <Form.Row className="search-form-row">
                <div className={btnColCss}>
                    <Button 
                        variant={theme.themeName} 
                        onClick={handleShowInput}
                    >
                        <i className="fa fa-search"></i>
                    </Button>
                </div>

                <div id="search-suggest" className={inputColCss}>
                    <AutoSuggestSearch closeAction={handleShowInput} />
                </div>
            </Form.Row>
        </Form>
    )
}

export default NavSearch

import React, { useContext, forwardRef } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import CustomThemeContext from '../../services/CustomThemeContext'

import './AutoSuggestSearch.css'

const ENTER_KEY = 13
const ESC_KEY = 27

/** 
 * Componente para renderizar o campo de busca
 */
const InputSuggestCustom = forwardRef((props, inputRef) => {
    // console.log("--- InputSuggestCustom", props)

    const { placeholder, onCloseInput, ...inputProps } = props

    // CONTEXT
    const { theme } = useContext(CustomThemeContext)

    const phText = placeholder ? placeholder : 'Buscar livro...' 
    const cssHideBtn = ((inputProps.value.length === 0) ? 'btn-close-hide' : '')

    // Previne o uso das teclas ENTER e ESC
    const preventEvent = e => {
        if ([ENTER_KEY, ESC_KEY].includes(e.keyCode)) {
            e.preventDefault()
            return
        }
    }
    
    return (
        <React.Fragment>
            
            <Button
                variant={theme.themeName}
                onClick={onCloseInput}
                className={`btn-input-close ${cssHideBtn}`}
            >
                <i className="fa fa-close" />
            </Button>

            {/* o mesmo que imput class="form-control" */}
            <FormControl 
                {...inputProps}
                type="text" 
                ref={inputRef}
                placeholder={phText} 
                style={theme.primary}
                className="auto-suggest-input"
                onKeyDown={preventEvent}
            />

        </React.Fragment>
    )
})

export default InputSuggestCustom
